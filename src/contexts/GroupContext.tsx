import React, { createContext, useContext, useState, ReactNode } from "react";

import { useUser } from "./UserContext";
import {
  fetchGroupById,
  fetchGroupMembers,
  fetchGroupEventsById,
  fetchAllUser,
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
  priceBands: PriceBand;
  going: number;
  capacity: number;
  availability: number;
  free: boolean;
  category: string;
  tags: string[];
  description: string[];
  attendeesId: number[];
  location: Location;
}

interface Group {
  id: number;
  name: string;
  image: string;
  groupAdmin: number;
  description: string[];
  openAccess: boolean;
  location: Location;
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

interface GroupContextType {
  group: Group | null;
  setGroup: (group: Group) => void;
  groupEvents: Event[];
  setGroupEvents: (events: Event[]) => void;
  groupMembers: User[];
  setGroupMembers: (users: User[]) => void;
  groupOrganiser: User | null;
  setGroupOrganiser: (user: User) => void;
  getGroupById: (id: number) => Promise<void>;
  getEventsById: (id: number) => Promise<void>;
  getGroupMembers: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

interface GroupProviderProps {
  children: ReactNode;
}

const GroupContext = createContext<GroupContextType | null>(null);

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [groupEvents, setGroupEvents] = useState<Event[]>([]);
  const [groupMembers, setGroupMembers] = useState<User[]>([]);
  const [groupOrganiser, setGroupOrganiser] = useState<User | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getGroupById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGroupById(id);
      const users = await fetchAllUser();
      const organiser = users?.find(
        (user) => Number(user?.id) === Number(data?.groupAdmin)
      );
      setGroup(data);
      setGroupOrganiser(organiser);
    } catch (err: any) {
      setError(err.message || "Failed to fetch group");
    } finally {
      setLoading(false);
    }
  };

  const getEventsById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGroupEventsById(id);
      setGroupEvents(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch group events");
    } finally {
      setLoading(false);
    }
  };
  const getGroupMembers = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGroupMembers(id);
      console.log(data, "group members");
      setGroupMembers(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch group members");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GroupContext.Provider
      value={{
        group,
        setGroup,
        groupEvents,
        setGroupEvents,
        groupMembers,
        setGroupMembers,
        getGroupById,
        getEventsById,
        getGroupMembers,
        groupOrganiser,
        setGroupOrganiser,
        error,
        loading,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = (): GroupContextType => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};
