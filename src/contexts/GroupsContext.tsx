import React, { createContext, useContext, useState, ReactNode } from "react";
import { fetchAllGroups } from "../../utils/api";

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

interface GroupsContextType {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  fetchGroups: (params: { [key: string]: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const GroupsContext = createContext<GroupsContextType>({
  groups: [],
  setGroups: () => {},
  fetchGroups: async () => {},
  loading: false,
  error: null,
});

interface GroupsProviderProps {
  children: ReactNode;
}

export const GroupsProvider: React.FC<GroupsProviderProps> = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async (params: { [key: string]: string }) => {
    setLoading(true);
    setError(null);
    try {
      const { category, sortBy = "popular" } = params;
      const groupsData = await fetchAllGroups({ category, sortBy });
      setGroups(groupsData);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setError("Failed to fetch groups.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GroupsContext.Provider
      value={{ groups, setGroups, fetchGroups, loading, error }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroups must be used within a GroupsProvider");
  }
  return context;
};
