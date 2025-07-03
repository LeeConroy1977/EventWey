import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  fetchUserEvents,
  fetchUserGroups,
  fetchUserNotifications,
  postJoinEvent,
  postJoinGroup,
  postLeaveEvent,
  postLeaveGroup,
  updateUser,
} from "../../utils/api/user-api";

import { useModal } from "./ModalContext";
import { useNavigate } from "react-router-dom";
import { useEvents } from "./EventsContext";
import { User } from "../types/user";
import { Event } from "../types/event";
import { Group } from "../types/group";
import { Notifications } from "../types/notifications";
import { useNotifications } from "./NotificationsContext";
import { useGroups } from "./GroupsContext";
import { useEvent } from "./EventContext";

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
  joinFreeEvent: (
    eventId: string,
    ticketType: string,
    body: {}
  ) => Promise<void>;
  getUserTotalEvents: () => Promise<void>;
  isNewConnection: boolean | null | undefined;
  isUserGroupMember: (groupId: number) => Promise<boolean>;
  isUserEventAttendee: (eventId: number) => Promise<boolean>;
  joinGroup: (groupId: number) => Promise<void>;
  leaveGroup: (groupId: number) => Promise<void>;
  leaveFreeEvent: (eventId: string, ticketType: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { events, setEvents, fetchEvents } = useEvents();
  const { getEventConnections, setEvent } = useEvent();
  const { groups, setGroups } = useGroups();
  const { hideModal } = useModal();
  const { setUserNotifications } = useNotifications();
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [refund, setRefund] = useState({});
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userTotalEvents, setUserTotalEvents] = useState<Event[]>([]);
  const [userTotalGroups, setUserTotalGroups] = useState<Group[]>([]);

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

  const joinFreeEvent = async (
    eventId: string | undefined,
    ticketType: string | undefined,
    body: {}
  ) => {
    const prevEvents = [...events];
    setLoading(true);
    setError(null);

    if (!eventId) {
      setError("Invalid event ID.");
      console.error("No event ID provided to joinFreeEvent.");
      setLoading(false);
      return;
    }

    const eventIdNum = Number(eventId);
    if (isNaN(eventIdNum)) {
      setError("Invalid event ID format.");
      console.error("Invalid event ID format:", eventId);
      setLoading(false);
      return;
    }

    const optimisticEvents = events.map((event) => {
      if (event.id === eventIdNum) {
        const updatedAttendees = [...(event.attendees ?? []), user?.id].filter(
          Boolean
        );
        return { ...event, attendees: updatedAttendees };
      }
      return { ...event };
    });
    console.log("Optimistic events:", optimisticEvents);
    setEvents(optimisticEvents);

    try {
      const eventJoined = await postJoinEvent(eventId, ticketType, body);
      console.log("Server response:", eventJoined);

      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventJoined.id ? { ...eventJoined } : { ...event }
        )
      );
      setEvent({ ...eventJoined });
      await Promise.all([
        fetchEvents({}),
        getEventConnections(eventId),
        fetchUserEvents(String(user?.id!), {}),
      ]);

      setLoading(false);
    } catch (err: unknown) {
      console.error("Error joining event:", err);
      setEvents([...prevEvents]);
      setLoading(false);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to join event.";
      setError(errorMessage);
    }
  };

  const leaveFreeEvent = async (
    eventId: string | undefined,
    ticketType: string | undefined
  ) => {
    const prevEvents = [...events];

    if (!user?.id) {
      throw new Error("User not authenticated. Please log in.");
    }

    const optimisticEvents = events.map((event) =>
      String(event.id) === String(eventId)
        ? {
            ...event,
            attendees: event?.attendees?.filter((id) => id !== user.id),
          }
        : event
    );
    setEvents(optimisticEvents);

    try {
      setLoading(true);
      setError(null);
      if (ticketType !== "") {
        const upDatedEvent = await postLeaveEvent(String(eventId), ticketType);
        const { updatedEvent, refund } = upDatedEvent;
        setEvents((prev) =>
          prev.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );
        setRefund(refund);
        setEvent(updatedEvent);
        await fetchEvents({});
        await getEventConnections(eventId);
        await fetchUserEvents(String(user?.id!), {});
      }
      if (ticketType === "") {
        const upDatedEvent = await postLeaveEvent(String(eventId), ticketType);

        setEvents((prev) =>
          prev.map((event) =>
            event.id === upDatedEvent.id ? upDatedEvent : event
          )
        );
        setRefund(refund);
        setEvent(upDatedEvent);
        await fetchEvents({});
        await getEventConnections(eventId);
        await fetchUserEvents(String(user?.id!), {});
      }
    } catch (err) {
      setEvents(prevEvents);
      console.error(`Error leaving event`, err);
      setError(`Failed to leave event`);
    } finally {
      setLoading(false);
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

  const joinGroup = async (groupId: number): Promise<void> => {
    const prevGroups = [...groups];

    if (!user?.id) {
      throw new Error("User not authenticated. Please log in.");
    }

    const optimisticGroups = groups.map((group) =>
      group.id === groupId
        ? { ...group, members: [...group?.members, user.id] }
        : group
    );
    setGroups(optimisticGroups);

    try {
      const groupJoined = await postJoinGroup(groupId.toString());
      setGroups((prev) =>
        prev.map((group) => (group.id === groupJoined.id ? groupJoined : group))
      );
    } catch (error) {
      setGroups(prevGroups);
      console.error(`Error joining group ${groupId}:`, error);
      throw error;
    }
  };

  const leaveGroup = async (groupId: number) => {
    const prevGroups = [...groups];

    if (!user?.id) {
      throw new Error("User not authenticated. Please log in.");
    }

    const optimisticGroups = groups.map((group) =>
      group.id === groupId
        ? { ...group, members: group?.members?.filter((id) => id !== user.id) }
        : group
    );
    setGroups(optimisticGroups);

    try {
      setLoading(true);
      setError(null);
      const upDatedGroup = await postLeaveGroup(groupId.toString());

      setGroups((prev) =>
        prev.map((group) =>
          group.id === upDatedGroup.id ? upDatedGroup : group
        )
      );
    } catch (err) {
      setGroups(prevGroups);
      console.error(`Error leaving group`, err);
      setError(`Failed to leave group`);
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

  const isUserGroupMember = async (groupId: number): Promise<boolean> => {
    if (!user?.id) {
      console.log("No user ID available");
      return false;
    }
    const group = groups.find((group) => group.id === groupId);
    if (!group) {
      console.log("Group not found:", groupId);
      return false;
    }
    return group.members.includes(user.id);
  };

  function isUserEventAttendee(eventId: number) {
    if (!user?.id) {
      console.log("No user ID available");
      return false;
    }
    const event = events.find((event) => event.id === eventId);
    if (!event) {
      return false;
    }

    return event.attendees.includes(user.id);
  }

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
        getUserNotifications,
        isUserGroupMember,
        joinGroup,
        leaveGroup,
        leaveFreeEvent,
        isUserEventAttendee,
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
