import React, { createContext, useContext, useState, ReactNode } from "react";

import { useUser } from "./UserContext";
import {
  fetchConnectionById,
  fetchConnectionConnections,
  fetchConnectionEvents,
  fetchConnectionGroups,
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
  id: string;
  image: string;
  title: string;
  date: string;
  groupName: string;
  groupId: number;
  duration: string;
  priceBands: PriceBand;
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
  groupAdmin: number;
  description: string[];
  openAccess: boolean;
  location: Location;
  creationDate: number;
  eventsCount: number;
  members: string[];
  events: string[];
  messages: any[];
  category: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  profileBackgroundImage: string;
  profileImage: string;
  bio: string;
  tags: string[];
  connections: string[];
  groups: string[];
  userEvents: string[];
  messages: string[];
  groupAdmin: string[];
  notifications: string[];
  showEvents: "public" | "private";
  showConnections: "public" | "private";
}

interface ConnectionContextType {
  connection: User | null;
  setConnection: (user: User) => void;
  connectionGroups: Group | null;
  setConnectionGroups: (group: Group) => void;
  connectionEvents: Event | null;
  setConnectionEvent: (Event: Group) => void;
  connectionConnections: User | null;
  setConnectionConnections: (user: User) => void;
  getConnectionById: (id: number) => Promise<void>;
  // getGroupById: (id: number) => Promise<void>;
  getConnectionConnections: (id: number) => Promise<void>;
  getConnectionEvents: (id: number) => Promise<void>;
  getConnectionGroups: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

interface ConnectionProviderProps {
  children: ReactNode;
}

const ConnectionContext = createContext<ConnectionContextType | null>(null);

export const ConnectionProvider: React.FC<ConnectionProviderProps> = ({
  children,
}) => {
  const [connection, setConnection] = useState<User | null>(null);
  const [connectionEvents, setConnectionEvents] = useState<Event[] | null>(
    null
  );
  const [connectionGroups, setConnectionGroups] = useState<Group[] | null>(
    null
  );
  const [connectionConnections, setConnectionConnections] = useState<User[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getConnectionById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchConnectionById(id);
      setConnection(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch connection");
    } finally {
      setLoading(false);
    }
  };

  const getConnectionConnections = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchConnectionConnections(id);
      setConnectionConnections(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch connections");
    } finally {
      setLoading(false);
    }
  };

  const getConnectionEvents = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchConnectionEvents(id);
      setConnectionEvents(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const getConnectionGroups = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchConnectionGroups(id);
      setConnectionGroups(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConnectionContext.Provider
      value={{
        connection,
        connectionGroups,
        connectionEvents,
        connectionConnections,
        getConnectionById,
        getConnectionConnections,
        getConnectionEvents,
        getConnectionGroups,
        error,
        loading,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = (): ConnectionContextType => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useEvent must be used within a ConnectionProvider");
  }
  return context;
};
