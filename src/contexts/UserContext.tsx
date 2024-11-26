import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

interface User {
  id: number;
  email: string;
  username: string;
  profileBackgroundImage: string;
  profileImage: string;
  bio: string;
  tags: string[];
  connectionsId: number[];
  groupsId: number[];
  userEventsId: number[];
  messagesId: number[];
  groupAdminId: number[];
  notificationsId: number[];
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
  id: number;
  image: string;
  title: string;
  date: string;
  groupname: string;
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
  membersId: number[];
  image: string;
  groupAdmin: number;
  description: string[];
  openAccess: boolean;
  location: string;
  creationDate: string;
  eventsCount: number;
  eventsId: number[];
  messagesId: number[];
}

interface UserContextType {
  user: User | null | undefined;
  events: Event[];
  userEvents: Event[];
  allEvents: Event[];
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  userConnections: User[];
  userGroups: Group[];
  error: string | null;
}

const defaultUser: User = {
  id: 3,
  email: "emma3@gmail.com",
  username: "Emma J",
  profileBackgroundImage: "https://picsum.photos/800/600?random=3",
  profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  bio: "Avid traveler, foodie and animal lover",
  tags: ["Gourmet Food Tours", "Animal Rescue", "Wanderlust Adventures"],
  connectionsId: [2, 3, 6, 7, 8, 9, 10, 11],
  groupsId: [2, 4, 5],
  userEventsId: [8, 9, 10],
  messagesId: [10, 12],
  groupAdminId: [3],
  notificationsId: [3, 6, 8],
  showEvents: "public",
  showConnections: "private",
};

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
