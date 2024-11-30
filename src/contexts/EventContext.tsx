import React, { createContext, useContext, useState, ReactNode } from "react";

import { useUser } from "./UserContext";
import {
  fetchEventById,
  fetchEventConnections,
  fetchEventGroupById,
} from "../../utils/api";

interface PriceBand {
  type: "Early bird" | "Standard" | "Standing" | "Seated" | "VIP";
  price: string;
}

interface Location {
  placename: string;
  lng: number;
  lat: number;
}

interface Event {
  id: number;
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
  attendeesId: number[];
  location: Location[];
}

interface Group {
  id: number;
  name: string;
  image: string;
  groupAdmin: number;
  description: string[];
  openAccess: boolean;
  location: string;
  creationDate: number;
  eventsCount: number;
  members: number[];
  events: number[];
  messages: any[];
  category: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  profileBackgroundImage: string;
  profileImage: string;
  bio: string;
  tags: string[];
  connections: number[];
  groups: number[];
  userEvents: number[];
  messages: number[];
  groupAdmin: number[];
  notifications: number[];
  showEvents: "public" | "private";
  showConnections: "public" | "private";
}

interface EventContextType {
  event: Event | null;
  setEvent: (event: Event) => void;
  eventGroup: Group | null;
  setEventGroup: (group: Group) => void;
  eventConnections: User | null;
  setEventConnections: (user: User) => void;
  getEventById: (id: number) => Promise<void>;
  getGroupById: (id: number) => Promise<void>;
  getEventConnections: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

interface EventProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [event, setEvent] = useState<Event>({});
  const [eventGroup, setEventGroup] = useState<Group>({});
  const [eventConnections, setEventConnections] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getEventById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventById(id);
      setEvent(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  const getGroupById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventGroupById(id);
      setEventGroup(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch group");
    } finally {
      setLoading(false);
    }
  };
  const getEventConnections = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventConnections(id);
      setEventConnections(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch connections");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        event,
        eventGroup,
        eventConnections,
        getEventById,
        getGroupById,
        getEventConnections,
        error,
        loading,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within a EventProvider");
  }
  return context;
};
