import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { fetchUserConnection } from "../../utils/api/user-api";

interface Connection {
  id: string;
  email: string;
  username: string;
  password: string;
  googleId: string;
  authMethod: string;
  profileBackgroundImage: string;
  profileImage: string;
  aboutMe: string;
  bio: string;
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

interface ConnectionContextType {
  connections: Connection[];
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
  filteredConnections: Connection[];
  setFilteredConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
  getAllConnections: (userId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  handleConnectionQuery: (value: string) => void;
}

interface ConnectionsProviderProps {
  children: ReactNode;
}

const ConnectionContext = createContext<ConnectionContextType | null>(null);

export const ConnectionsProvider: React.FC<ConnectionsProviderProps> = ({
  children,
}) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [filteredConnections, setFilteredConnections] = useState<Connection[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllConnections = async (userId: string) => {
    if (!userId) {
      console.error("User ID is undefined.");
      setError("User is not defined.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const userConnections = await fetchUserConnection(userId);
      setConnections(userConnections);
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError("Failed to fetch connections.");
    } finally {
      setLoading(false);
    }
  };

  const handleConnectionQuery = (value: string) => {
    const filteredArr = connections.filter((connection) =>
      connection.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredConnections(filteredArr);
  };

  useEffect(() => {
    setFilteredConnections(connections);
  }, [connections]);

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        setConnections,
        filteredConnections,
        setFilteredConnections,
        getAllConnections,
        loading,
        error,
        handleConnectionQuery,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnections = (): ConnectionContextType => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnections must be used within a ConnectionsProvider");
  }
  return context;
};
