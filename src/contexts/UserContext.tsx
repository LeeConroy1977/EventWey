import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  fetchConnetionRequests,
  fetchUserEvents,
  fetchUserGroups,
  fetchUserNotifications,
  postAcceptConnetionRequest,
  postRejectConnetionRequest,
  updateUser,
} from "../../utils/api/user-api";
import { fetchEventById, patchEvent } from "../../utils/api/events-api";
import { useModal } from "./ModalContext";
import { useNavigate } from "react-router-dom";
import { useEvents } from "./EventsContext";
import { User } from "../types/user";
import { Event } from "../types/event";
import { Group } from "../types/group";
import { Notifications } from "../types/notifications";
import { useNotifications } from "./NotificationsContext";

interface Request {
  id: number;
  requester: number;
}

interface UserContextType {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  userEvents: Event[];
  userTotalEvents: Event[];
  userGroups: Group[];
  userNotifications: Notifications[];
  userTotalGroups: Group[];
  loading: boolean;
  error: string | null;
  getUserEvents: (params: { [key: string]: string }) => void;
  getUserGroups: (params: { [key: string]: string }) => void;
  getUserNotifications: (id: number) => void;
  getUserTotalGroups: (params: { [key: string]: string }) => void;
  isUserAttendingEvent: (id: string) => boolean;
  handleSignOut: () => void;
  patchUser: (field: keyof User, value: any) => Promise<void>;
  joinFreeEvent: (eventId: string) => Promise<void>;
  getUserTotalEvents: () => Promise<void>;
  acceptConnectionRequest: (id: number) => Promise<void>;
  rejectConnectionRequest: (id: number) => Promise<void>;
  isNewConnection: boolean | null | undefined;
  userConnectionRequests: Request[];
  getConnectionRequest: (id: number) => void;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { setEvents } = useEvents();
  const { hideModal } = useModal();
  const { setUserNotifications } = useNotifications();
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userTotalEvents, setUserTotalEvents] = useState<Event[]>([]);
  const [userTotalGroups, setUserTotalGroups] = useState<Group[]>([]);
  const [isNewConnection, setIsNewConnection] = useState<boolean>(false);
  const [userConnectionRequests, setUserConnectionRequests] = useState<[]>([]);

  const handleSignOut = () => {
    hideModal();
    navigate(`/connection/${user?.id}`);
    setUser(null);
  };

  const patchUser = async (field: keyof User, value: any) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await updateUser(String(user?.id!), {
        [field]: value,
      });
      setUser(updatedUser);
    } catch (err) {
      console.error(`Error updating user field ${field}:`, err);
      setError(`Failed to update ${field}.`);
    } finally {
      setLoading(false);
    }
  };

  const joinFreeEvent = async (eventId: string | undefined) => {
    try {
      setError(null);

      if (!eventId) {
        setError("Invalid event ID.");
        console.error("No event ID provided to joinFreeEvent.");
        return;
      }

      const event = await fetchEventById(eventId);

      if (!event || !Array.isArray(event.attendees)) {
        setError("Event not found or has invalid data.");
        console.error("Invalid event data:", event);
        return;
      }

      if (event.availability <= 0) {
        setError("Event is fully booked.");
        return;
      }

      if (event.attendees.includes(user?.id || "")) {
        setError("You have already joined this event.");
        return;
      }

      const updatedUser = await updateUser(String(user?.id!), {
        userEvents: [...(user?.events ?? []), eventId],
      });

      const updatedEvent = await patchEvent(eventId, {
        attendees: [...event.attendees, user?.id || ""],
        going: event.going + 1,
        availability: event.availability - 1,
      });

      setUser(updatedUser);

      (setEvents as any)((prevEvents: any) => {
        const eventExists = prevEvents.some((e: any) => e.id === eventId);

        if (eventExists) {
          return prevEvents.map((e: any) =>
            e.id === eventId ? updatedEvent : e
          );
        } else {
          return [...prevEvents, updatedEvent];
        }
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Error joining event ${eventId || "undefined"}:`, err);
        setError(err.message || "Failed to join the event.");
      } else {
        console.error(
          `Unknown error occurred while joining event ${eventId || "undefined"}`
        );
        setError("Failed to join the event.");
      }
    }
  };

  const getUserEvents = async (params: { [key: string]: string }) => {
    setLoading(true);
    setError(null);

    try {
      if (!user?.id) {
        throw new Error("User ID is not available.");
      }

      const { category = "", date = "", sortBy = "date" } = params;
      const events = await fetchUserEvents(String(user?.id!), {
        category,
        date,
        sortBy,
      });

      setUserEvents(events);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching events:", err.message);
        setError(err.message || "Failed to fetch events.");
      } else {
        console.error("Unknown error fetching events:", err);
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserTotalEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!user?.id) {
        throw new Error("User ID is not available.");
      }

      const totalEvents = await fetchUserEvents(String(user?.id!), {});
      setUserTotalEvents(totalEvents);
    } catch (err: any) {
      console.error("Error fetching events:", err.response || err);
      setError(err.message || "Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const getUserGroups = async (params: { [key: string]: string }) => {
    setLoading(true);
    setError(null);

    if (!user?.id) {
      setError("User is not logged in or doesn't have a valid ID.");
      setLoading(false);
      return;
    }

    try {
      const { category, sortBy = "popular" } = params;
      const groups = await fetchUserGroups(String(user?.id!), {
        category,
        sortBy,
      });

      setUserGroups(groups);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setError("Failed to fetch groups.");
    } finally {
      setLoading(false);
    }
  };

  const getUserTotalGroups = async () => {
    setLoading(true);
    setError(null);

    if (!user?.id) {
      setError("User is not logged in or doesn't have a valid ID.");
      setLoading(false);
      return;
    }

    try {
      const totalGroups = await fetchUserGroups(String(user?.id!), {});
      setUserTotalGroups(totalGroups);
    } catch (err) {
      console.error("Error fetching groups", err);
      setError("Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  const getUserNotifications = async (id: number) => {
    setLoading(true);
    setError(null);

    if (!user?.id) {
      setError("User is not logged in or doesn't have a valid ID.");
      setLoading(false);
      return;
    }

    try {
      const notifictions = await fetchUserNotifications(String(id));
      const unReadNotifictions = notifictions
        .filter((notificatons) => !notificatons.isRead)
        .sort((a, b) => a.createdAt - b.createdAt);
      const readNotifictions = notifictions
        .filter((notificatons) => notificatons.isRead)
        .sort((a, b) => a.createdAt - b.createdAt);
      setUserNotifications([...unReadNotifictions, ...readNotifictions]);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  // const getUserConnectionRequests = async () => {
  //   setLoading(true);
  //   setError(null);

  //   if (!user?.id) {
  //     setError("User is not logged in or doesn't have a valid ID.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const notifictions = await fetchUserNotifications(id)
  //     const connectionsRequests = notifictions.filter((notification) => notification.types === '')
  //     setUserTotalGroups(totalGroups);
  //   } catch (err) {
  //     console.error("Error fetching groups", err);
  //     setError("Failed to fetch groups");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getConnectionRequest = async (id: number) => {
    if (!user?.id) {
      setError("User is not logged in or doesn't have a valid ID.");
      setLoading(false);
      return;
    }
    try {
      const requests = await fetchConnetionRequests(String(id));
      setUserConnectionRequests(requests);
    } catch (err) {
      console.error("Error accepting request", err);
      setError("Failed to accept request.");
    } finally {
      setLoading(false);
    }
  };

  const acceptConnectionRequest = async (id: number) => {
    if (!user?.id) {
      setError("User is not logged in or doesn't have a valid ID.");
      setLoading(false);
      return;
    }
    try {
      const acceptMessage = await postAcceptConnetionRequest(String(id));
      if (acceptMessage) {
        setIsNewConnection(true);
      }
    } catch (err) {
      console.error("Error accepting request", err);
      setError("Failed to accept request.");
    } finally {
      setLoading(false);
    }
  };

  const rejectConnectionRequest = async (id: number) => {
    if (!user?.id) {
      setError("User is not logged in or doesn't have a valid ID.");
      setLoading(false);
      return;
    }
    try {
      const rejectMessage = await postRejectConnetionRequest(String(id));
      if (rejectMessage) {
        setIsNewConnection(false);
      }
    } catch (err) {
      console.error("Error rejecting request", err);
      setError("Failed to reject request.");
    } finally {
      setLoading(false);
    }
  };

  function isUserAttendingEvent(id: string) {
    const isAttending = user?.events?.includes(Number(id));
    return isAttending || false;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userEvents,
        userGroups,
        loading,
        error,
        getUserEvents,
        getUserGroups,
        handleSignOut,
        patchUser,
        joinFreeEvent,
        getUserTotalEvents,
        userTotalEvents,
        userTotalGroups,
        getUserTotalGroups,
        isUserAttendingEvent,
        getUserNotifications,
        acceptConnectionRequest,
        userConnectionRequests,
        getConnectionRequest,
        rejectConnectionRequest,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
