import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  createUser,
  fetchUserEvents,
  fetchUserGroups,
  updateUser,
} from "../../utils/api/user-api";
import {
  fetchAllEvents,
  fetchEventById,
  patchEvent,
} from "../../utils/api/events-api";
import { useModal } from "./ModalContext";
import { useNavigate } from "react-router-dom";
import { useEvents } from "./EventsContext";

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  googleId: string;
  authMethod: string;
  profileBackgroundImage: string;
  profileImage: string;
  aboutMe: string;
  tags: string[];
  connections: string[];
  groups: string[];
  userEvents: string[];
  messages: string[];
  groupAdmin: string[];
  notifications: string[];
  viewEventsStatus: string;
  viewConnectionsStatus: string;
  viewGroupsStatus: string;
  viewTagsStatus: string;
  viewProfileImage: string;
  viewBioStatus: string;
  aboutMeStatus: string;
  role: string;
}

interface PriceBand {
  type: "Early bird" | "Standard" | "Standing" | "Vip";
  price: string;
}

interface Location {
  placename: string;
  lng: number;
  lat: number;
}

interface Event {
  id: string;
  image: string;
  title: string;
  date: string;
  groupName: string;
  groupId: number;
  duration: string;
  priceBands: PriceBand[];
  going: number;
  capacity: number;
  availability: number;
  free: boolean;
  category: string;
  tags: string[];
  description: string[];
  attendees: string[];
  location: Location;
  approved: boolean;
}

interface Group {
  id: string;
  name: string;
  image: string;
  groupAdmin: string[];
  description: string[];
  openAccess: boolean;
  location: Location;
  creationDate: number;
  eventsCount: number;
  members: string[];
  events: string[];
  messages: string[];
  category: string;
  approved: boolean;
}

interface UserContextType {
  user: User | null;
  userEvents: Event[];
  userGroup: Group[];
  loading: boolean;
  error: string | null;
  getUserEvents: (params: { [key: string]: string }) => void;
  getUserGroups: (params: { [key: string]: string }) => void;
  handleSignOut: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

const defaultUser = {
  id: "1",
  email: "mia6@gmail.com",
  username: "Mia F",
  password: "Password#6",
  googleId: null,
  authMethod: "email",
  profileBackgroundImage: "https://picsum.photos/800/600?random=6",
  profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
  aboutMe:
    "Hi, I’m Mia! I’m passionate about connecting with people and exploring new experiences. Whether it’s attending community events, learning a new skill, or just enjoying a fun day out, I love being part of activities that bring people together. My interests include tech, sustainability, and trying out unique workshops.",
  bio: "Lover of all things creative and tech.",
  tags: ["Outdoor Concerts", "Mountain Biking", "Songwriting Circles"],
  connections: ["2", "3", "4", "5", "6", "7", "8", "15", "30"],
  groups: ["1", "9", "11", "13"],
  userEvents: ["1", "2", "5", "10", "22", "23", "24"],
  messages: [],
  groupAdmin: ["1"],
  notifications: [],
  viewEventsStatus: "public",
  viewConnectionsStatus: "public",
  viewGroupsStatus: "public",
  viewTagsStatus: "public",
  viewProfileImage: "public",
  viewBioStatus: "public",
  aboutMeStatus: "public",
  role: "user",
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { events, setEvents } = useEvents();
  const { hideModal } = useModal();
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userTotalEvents, setUserTotalEvents] = useState<Event[]>([]);
  const [userTotalGroups, setUserTotalGroups] = useState<Event[]>([]);

  const handleSignOut = () => {
    hideModal();
    navigate(`/connection/${user?.id}`);
    setUser(null);
  };

  const patchUser = async (field: keyof User, value: any) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await updateUser(user?.id!, { [field]: value });
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

      console.log("Fetching event with ID:", eventId);
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

      const updatedUser = await updateUser(user?.id!, {
        userEvents: [...(user?.userEvents ?? []), eventId],
      });
      const updatedEvent = await patchEvent(eventId, {
        attendees: [...event.attendees, user?.id || ""],
        going: event.going + 1,
        availability: event.availability - 1,
      });

      setUser(updatedUser);
      setEvents((prevEvents) => {
        const eventExists = prevEvents.some((e) => e.id === eventId);
        if (eventExists) {
          return prevEvents.map((e) => (e.id === eventId ? updatedEvent : e));
        } else {
          return [...prevEvents, updatedEvent];
        }
      });
    } catch (err) {
      console.error(`Error joining event ${eventId || "undefined"}:`, err);
      setError("Failed to join the event.");
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
      const events = await fetchUserEvents(user?.id!, {
        category,
        date,
        sortBy,
      });
      setUserEvents(events);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message || "Failed to fetch events.");
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

      const totalEvents = await fetchUserEvents(user?.id, {});
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
    try {
      const { category, sortBy = "popular" } = params;
      const groups = await fetchUserGroups(user?.id, { category, sortBy });
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
    try {
      const totalGroups = await fetchUserGroups(user.id, {});
      setUserTotalGroups(totalGroups);
    } catch (err) {
      console.error("Error fetching groups", err);
      setError("Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  function isUserAttendingEvent(id) {
    const isAttending = user?.userEvents?.includes(String(id));
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
      }}
    >
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
