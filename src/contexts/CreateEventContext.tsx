import React, { useReducer, createContext, useContext, useState } from "react";
import {
  CreateEventReducer,
  initialState,
  CreateEventState,
  CreateEventAction,
} from "../reducers/CreateEventReducer";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import {
  fetchAllCategories,
  fetchAllTags,
} from "../../utils/api/categories-api";
import { fetchUserAdminGroupById } from "../../utils/api/user-api";
import { postEvent } from "../../utils/api/events-api";
import { patchGroup } from "../../utils/api/groups-api";

interface EventLocation {
  placename: string;
  lng: number;
  lat: number;
}

interface PriceBand {
  type: "Early bird" | "Standard" | "VIP";
  price: string;
  ticketCount: number;
}

interface Event {
  image: string;
  date: number;
  startTime: string;
  title: string;
  groupName: string;
  groupId: string;
  duration: string;
  going: number;
  attendees: string[];
  capacity: number;
  availability: number;
  free: boolean;
  priceBands: PriceBand[];
  category: string;
  tags: string[];
  description: string[];
  location: EventLocation;
  approved: boolean;
}

interface CreateEventContextType {
  state: CreateEventState;
  dispatch: React.Dispatch<CreateEventAction>;
  nextStep: () => void;
  prevStep: () => void;
  createEvent: (newEvent: Event) => Promise<Event | null>;
  categories: string[];
  getAllCatgories: () => Promise<void>;
  getTags: () => Promise<void>;
  categoryTags: string[];
  newEvent: Event;
  finishCreateEvent: () => void;
  getUserAdminGroups: () => Promise<void>;
  adminGroups: string[];
  setNewEvent: React.Dispatch<React.SetStateAction<Event>>;
  startEventCreation: () => void;
  resetEvent: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
}

const CreateEventContext = createContext<CreateEventContextType | undefined>(
  undefined
);

export const CreateEventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CreateEventReducer, initialState);
  const [newEvent, setNewEvent] = useState<Event>({
    image: "",
    date: 0,
    startTime: "",
    title: "",
    groupName: "",
    groupId: "",
    duration: "",
    going: 0,
    attendees: [],
    capacity: 0,
    availability: 0,
    free: true,
    priceBands: [],
    category: "",
    tags: [],
    description: [],
    location: {
      placename: "",
      lng: 0,
      lat: 0,
    },
    approved: false,
  });
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryTags, setCategoryTags] = useState<string[]>([]);
  const [adminGroups, setAdminGroups] = useState<string[]>([]);

  const navigate = useNavigate();

  const getAllCatgories = async () => {
    try {
      const categories = await fetchAllCategories();
      setCategories(categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories.");
    }
  };

  const getTags = async () => {
    try {
      setLoading(true);
      setError(null);
      const tags = await fetchAllTags();
      setCategoryTags(tags);
    } catch (err) {
      console.error("Error fetching tags:", err);
      setError("Failed to fetch tags.");
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (newEvent: Event): Promise<Event | null> => {
    try {
      const event = await postEvent(newEvent);
      setNewEvent(event);

      if (event) {
        const group = await patchGroup(event.groupId, {});
        const updatedEvents = Array.isArray(group.events) ? group.events : [];
        const newEvents = [...new Set([...updatedEvents, event.id])];

        await patchGroup(event.groupId, {
          events: newEvents,
        });
      }

      return event;
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event.");
      return null;
    }
  };

  const getUserAdminGroups = async () => {
    try {
      // @ts-ignore
      const groups = await fetchUserAdminGroupById(user?.id);
      setAdminGroups(groups);
    } catch (err) {
      console.error("Error fetching admin groups:", err);
      setError("Failed to fetch admin groups.");
    }
  };

  const startEventCreation = () => {
    dispatch({ type: "START_EVENT_CREATION" });
  };

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const prevStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const finishCreateEvent = () => {
    navigate("/user/events");
  };

  const resetEvent = () => {
    dispatch({ type: "RESTART_EVENT_CREATION" });
  };

  return (
    <CreateEventContext.Provider
      value={{
        state,
        dispatch,
        nextStep,
        prevStep,
        createEvent,
        categories,
        getAllCatgories,
        getTags,
        categoryTags,
        newEvent,
        finishCreateEvent,
        getUserAdminGroups,
        adminGroups,
        setNewEvent,
        startEventCreation,
        resetEvent,
        loading,
        setLoading,
        error,
      }}
    >
      {children}
    </CreateEventContext.Provider>
  );
};

export const useCreateEventContext = (): CreateEventContextType => {
  const context = useContext(CreateEventContext);
  if (!context) {
    throw new Error(
      "useCreateEventContext must be used within a CreateEventProvider"
    );
  }
  return context;
};
