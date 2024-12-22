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
  fetchUserAdminGroupById,
  patchGroup,
  postEvent,
} from "../../utils/api";

const CreateEventContext = createContext<{
  state: CreateEventState;
  dispatch: React.Dispatch<CreateEventAction>;
  nextStep: () => void;
  prevStep: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  nextStep: () => {},
  prevStep: () => {},
});

export const CreateEventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CreateEventReducer, initialState);
  const [newEvent, setNewEvent] = useState({
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
  const { user, setUser } = useUser();
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
    } catch (error) {
      console.error("Error fetching categories:", error);
      return null;
    }
  };

  const getTags = async () => {
    try {
      setLoading(true);
      setError(null);
      const tags = await fetchAllTags();
      setCategoryTags(tags);
    } catch (err) {
      console.error("Error fetching tags");
      setError(`Failed to fetch tags.`);
    } finally {
      setLoading(false);
    }
  };
  const createEvent = async (newEvent) => {
    try {
      const event = await postEvent(newEvent);
      setNewEvent(event);

      if (event) {
        const group = await patchGroup(event.groupId, {});

        const updatedEvents = Array.isArray(group.events) ? group.events : [];

        const newEvents = [...new Set([...updatedEvents, event.id])];

        const updatedGroup = await patchGroup(event.groupId, {
          events: newEvents,
        });

      }

      return newEvent;
    } catch (error) {
      console.error("Error creating event:", error);
      return null;
    }
  };

  const getUserAdminGroups = async () => {
    try {
      const groups = await fetchUserAdminGroupById(user.id);
      setAdminGroups(groups);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return null;
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

  function resetEvent() {
    dispatch({ type: "RESTART_EVENT_CREATION" });
  }

  console.log(newEvent);

  return (
    <CreateEventContext.Provider
      value={{
        nextStep,
        prevStep,
        createEvent,
        state,
        categories,
        getAllCatgories,
        getTags,
        dispatch,
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
      }}
    >
      {children}
    </CreateEventContext.Provider>
  );
};

export const useCreateEventContext = () => useContext(CreateEventContext);
