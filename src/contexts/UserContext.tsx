import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  createUser,
  fetchUserEvents,
  fetchUserGroups,
  updateUser,
} from "../../utils/api";

interface User {
  id: string;
  email: string;
  username: string;
  profileImage: string;
  profileBackgroundImage: string;
  bio: string;
  aboutMe: string;
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
  messages: string[];
  category: string;
}

interface UserContextType {
  user: User | null;
  userEvents: Event[];
  userGroup: Group[];
  loading: boolean;
  error: string | null;
  getUserEvents: () => void;
  getUserGroups: () => void;
  handleSignOut: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [userTotalEvents, setUserTotalEvents] = useState<Event[]>([]);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [userTotalGroups, setUserTotalGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = () => {
    setUser(null);
  };

  const patchUser = async (field: keyof User, value: any) => {
    try {
      setLoading(true);
      setError(null);

      // Assuming you have an API endpoint for patching user details
      const updatedUser = await updateUser(user?.id, { [field]: value });
      setUser(updatedUser);
      // Update context state
    } catch (err) {
      console.error(`Error updating user field ${field}:`, err);
      setError(`Failed to update ${field}.`);
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
      const events = await fetchUserEvents(user.id, { category, date, sortBy });
      setUserEvents(events);
    } catch (err: any) {
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

      const totalEvents = await fetchUserEvents(user.id, {});
      console.log("Total Events Fetched:", totalEvents);
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
      const groups = await fetchUserGroups(user.id, {
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

  console.log(user);

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
        userTotalEvents,
        userTotalGroups,
        getUserTotalEvents,
        getUserGroups,
        getUserTotalGroups,
        handleSignOut,
        patchUser,
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
