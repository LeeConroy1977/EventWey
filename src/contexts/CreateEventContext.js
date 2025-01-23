import { jsx as _jsx } from "react/jsx-runtime";
import { useReducer, createContext, useContext, useState } from "react";
import { CreateEventReducer, initialState, } from "../reducers/CreateEventReducer";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { fetchAllCategories, fetchAllTags, } from "../../utils/api/categories-api";
import { fetchUserAdminGroupById } from "../../utils/api/user-api";
import { postEvent } from "../../utils/api/events-api";
import { patchGroup } from "../../utils/api/groups-api";
const CreateEventContext = createContext(undefined);
export const CreateEventProvider = ({ children, }) => {
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
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryTags, setCategoryTags] = useState([]);
    const [adminGroups, setAdminGroups] = useState([]);
    const navigate = useNavigate();
    const getAllCategories = async () => {
        try {
            const categories = await fetchAllCategories();
            setCategories(categories);
        }
        catch (err) {
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
        }
        catch (err) {
            console.error("Error fetching tags:", err);
            setError("Failed to fetch tags.");
        }
        finally {
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
                await patchGroup(event.groupId, {
                    events: newEvents,
                });
            }
            return event;
        }
        catch (err) {
            console.error("Error creating event:", err);
            setError("Failed to create event.");
            return null;
        }
    };
    const getUserAdminGroups = async () => {
        try {
            const groups = await fetchUserAdminGroupById(user?.id);
            setAdminGroups(groups);
        }
        catch (err) {
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
    return (_jsx(CreateEventContext.Provider, { value: {
            state,
            dispatch,
            nextStep,
            prevStep,
            createEvent,
            categories,
            getAllCategories,
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
        }, children: children }));
};
export const useCreateEventContext = () => {
    const context = useContext(CreateEventContext);
    if (!context) {
        throw new Error("useCreateEventContext must be used within a CreateEventProvider");
    }
    return context;
};
