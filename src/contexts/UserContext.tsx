import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

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
  userEvents: Event[];
  events: Event[];
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  userConnections: User[];
  userGroups: Group[];
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
  const [user, setUser] = useState<User | null>(defaultUser);
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [userConnections, setUserConnections] = useState<User[]>([]);
  const [userGroups, setUserGroups] = useState<Group[]>([]);

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
  });

  useEffect(() => {
    apiClient
      .get<Event[]>("/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  useEffect(() => {
    apiClient
      .get<User[]>("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    apiClient
      .get<Group[]>("/groups")
      .then((response) => setGroups(response.data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  const getUserEvents = () => {
    if (user && events.length) {
      const matchedEvents = user.userEventsId
        .map((userEventId) => events.find((event) => event.id === userEventId))
        .filter(Boolean) as Event[];
      setUserEvents(matchedEvents);
    }
  };

  const getUserConnections = () => {
    if (user && users.length) {
      const matchedConnections = user.connectionsId
        .map((connectionId) =>
          users.find((connection) => connection.id === connectionId)
        )
        .filter(Boolean) as User[];
      setUserConnections(matchedConnections);
    }
  };

  const getUserGroups = () => {
    if (user && groups.length) {
      const matchedGroups = user.groupsId
        .map((groupId) =>
          groups.find((group) => group.membersId.includes(groupId))
        )

        .filter(Boolean) as Group[];
      setUserGroups(matchedGroups);
    }
  };

  useEffect(() => {
    getUserEvents();
  }, [events]);

  useEffect(() => {
    getUserConnections();
  }, [users]);

  useEffect(() => {
    getUserGroups();
  }, [groups]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userEvents,
        events,
        userConnections,
        userGroups,
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
