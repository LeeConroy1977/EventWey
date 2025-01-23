import { createContext, useContext, useState, ReactNode, FC } from "react";
import { fetchAllGroups } from "../../utils/api/groups-api";

interface Location {
  placename: string;
  lng: number;
  lat: number;
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

interface GroupsContextType {
  groups: Group[];
  reviewGroups: Group[];
  setGroups: (groups: Group[]) => void;
  fetchGroups: (params: { [key: string]: string }) => Promise<void>;
  fetchReviewGroups: (params: { [key: string]: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const GroupsContext = createContext<GroupsContextType>({
  groups: [],
  reviewGroups: [],
  setGroups: () => {}, // Default no-op function
  fetchGroups: async () => {}, // Default empty async function
  fetchReviewGroups: async () => {}, // Default empty async function
  loading: false,
  error: null,
});

interface GroupsProviderProps {
  children: ReactNode;
}

export const GroupsProvider: FC<GroupsProviderProps> = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [reviewGroups, setReviewGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async (params: { [key: string]: string }) => {
    setLoading(true);
    setError(null);
    try {
      const { category, sortBy = "popular" } = params;
      const groupsData = await fetchAllGroups({ category, sortBy });
      const approvedGroups = groupsData.filter(
        (group: any) => group.approved === true
      );
      setGroups(approvedGroups);
    } catch (err: any) {
      console.error("Error fetching groups:", err);
      setError("Failed to fetch groups.");
    } finally {
      setLoading(false);
    }
  };
  // @ts-ignore
  const fetchReviewGroups = async (params: { [key: string]: string }) => {
    setLoading(true);
    setError(null);
    try {
      const groupsData = await fetchAllGroups({});
      const reviewGroups = groupsData.filter(
        (group: any) => group.approved === false
      );
      setReviewGroups(reviewGroups);
    } catch (err: any) {
      console.error("Error fetching review groups:", err);
      setError("Failed to fetch review groups.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GroupsContext.Provider
      value={{
        groups,
        setGroups,
        fetchGroups,
        loading,
        error,
        fetchReviewGroups,
        reviewGroups,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = (): GroupsContextType => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroups must be used within a GroupsProvider");
  }
  return context;
};
