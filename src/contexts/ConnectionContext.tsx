import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  fetchConnectionById,
  fetchConnectionConnections,
  fetchConnectionEvents,
  fetchConnectionGroups,
} from "../../utils/api/connection-api";
import {User} from '../types/user'
import {Event} from '../types/event'
import {Group} from '../types/group'



interface ConnectionContextType {
  connection: User | null;
  setConnection: (user: User) => void;
  connectionGroups: Group[] | null;
  setConnectionGroups: (groups: Group[]) => void;
  connectionEvents: Event[] | null;
  setConnectionEvents: (events: Event[]) => void;
  connectionConnections: User[] | null;
  setConnectionConnections: (users: User[]) => void;
  getConnectionById: (id: string) => Promise<void>;
  getConnectionConnections: (id: string) => Promise<void>;
  getConnectionEvents: (id: string) => Promise<void>;
  getConnectionGroups: (id: string) => Promise<void>;
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
  const [connectionConnections, setConnectionConnections] = useState<
    User[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getConnectionById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchConnectionById(id);
      setConnection(data);
    } catch (err) {
      const errorMessage =
        (err as Error).message || "Failed to fetch connection";
      setError(errorMessage);
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
    } catch (err) {
      const errorMessage =
        (err as Error).message || "Failed to fetch connections";
      setError(errorMessage);
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
    } catch (err) {
      const errorMessage = (err as Error).message || "Failed to fetch events";
      setError(errorMessage);
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
    } catch (err) {
      const errorMessage = (err as Error).message || "Failed to fetch groups";
      setError(errorMessage);
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
        setConnection,
        setConnectionGroups,
        setConnectionEvents,
        setConnectionConnections,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = (): ConnectionContextType => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
