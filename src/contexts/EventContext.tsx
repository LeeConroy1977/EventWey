import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  fetchEventById,
  fetchEventConnections,
  fetchEventGroupById,
} from "../../utils/api/events-api";

interface PriceBand {
  type: "Early bird" | "Standard" | "VIP";
  price: string;
  ticketCount: number;
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
  attendeesId: string[];
  location: Location;
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
}

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

interface EventContextType {
  event: Event | null;
  setEvent: (event: Event) => void;
  eventGroup: Group | null;
  setEventGroup: (group: Group) => void;
  eventConnections: User[] | null;
  setEventConnections: (users: User[]) => void;
  getEventById: (id: string) => Promise<void>;
  getGroupById: (id: string) => Promise<void>;
  getEventConnections: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

interface EventProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [eventGroup, setEventGroup] = useState<Group | null>(null);
  const [eventConnections, setEventConnections] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getEventById = async (id: string) => {
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

  const getGroupById = async (id: string) => {
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
        setEvent,
        setEventGroup,
        setEventConnections,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
