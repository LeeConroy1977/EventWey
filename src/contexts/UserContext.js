import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { fetchUserEvents, fetchUserGroups, updateUser, } from "../../utils/api/user-api";
import { fetchEventById, patchEvent, } from "../../utils/api/events-api";
import { useModal } from "./ModalContext";
import { useNavigate } from "react-router-dom";
import { useEvents } from "./EventsContext";
const UserContext = createContext(null);
const defaultUser = {
    id: "1",
    email: "mia6@gmail.com",
    username: "Mia F",
    password: "Password#6",
    googleId: null,
    authMethod: "email",
    profileBackgroundImage: "https://picsum.photos/800/600?random=6",
    profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
    aboutMe: "Hi, I’m Mia! I’m passionate about connecting with people and exploring new experiences. Whether it’s attending community events, learning a new skill, or just enjoying a fun day out, I love being part of activities that bring people together. My interests include tech, sustainability, and trying out unique workshops.",
    bio: "Lover of all things creative and tech.",
    tags: ["Outdoor Concerts", "Mountain Biking", "Songwriting Circles"],
    connections: ["2", "3", "4", "5", "6", "7", "8", "15", "30"],
    groups: ["1", "9", "11", "13"],
    userEvents: ["1", "2", "5", "10", "22", "23", "24"],
    messages: [],
    groupAdmin: ["1"],
    notifications: [],
    viewEventsStatus: "public",
    viewConnectionsStatus: "public",
    viewGroupsStatus: "public",
    viewTagsStatus: "public",
    viewProfileImage: "public",
    viewBioStatus: "public",
    aboutMeStatus: "public",
    role: "user",
};
export const UserProvider = ({ children }) => {
    const { events, setEvents } = useEvents();
    const { hideModal } = useModal();
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [userEvents, setUserEvents] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userTotalEvents, setUserTotalEvents] = useState([]);
    const [userTotalGroups, setUserTotalGroups] = useState([]);
    const handleSignOut = () => {
        hideModal();
        navigate(`/connection/${user?.id}`);
        setUser(null);
    };
    const patchUser = async (field, value) => {
        try {
            setLoading(true);
            setError(null);
            const updatedUser = await updateUser(user?.id, { [field]: value });
            setUser(updatedUser);
        }
        catch (err) {
            console.error(`Error updating user field ${field}:`, err);
            setError(`Failed to update ${field}.`);
        }
        finally {
            setLoading(false);
        }
    };
    const joinFreeEvent = async (eventId) => {
        try {
            setError(null);
            if (!eventId) {
                setError("Invalid event ID.");
                console.error("No event ID provided to joinFreeEvent.");
                return;
            }
            console.log("Fetching event with ID:", eventId);
            const event = await fetchEventById(eventId);
            if (!event || !Array.isArray(event.attendees)) {
                setError("Event not found or has invalid data.");
                console.error("Invalid event data:", event);
                return;
            }
            if (event.availability <= 0) {
                setError("Event is fully booked.");
                return;
            }
            if (event.attendees.includes(user?.id || "")) {
                setError("You have already joined this event.");
                return;
            }
            const updatedUser = await updateUser(user?.id, {
                userEvents: [...(user?.userEvents ?? []), eventId],
            });
            const updatedEvent = await patchEvent(eventId, {
                attendees: [...event.attendees, user?.id || ""],
                going: event.going + 1,
                availability: event.availability - 1,
            });
            setUser(updatedUser);
            setEvents((prevEvents) => {
                const eventExists = prevEvents.some((e) => e.id === eventId);
                if (eventExists) {
                    return prevEvents.map((e) => (e.id === eventId ? updatedEvent : e));
                }
                else {
                    return [...prevEvents, updatedEvent];
                }
            });
        }
        catch (err) {
            console.error(`Error joining event ${eventId || "undefined"}:`, err);
            setError("Failed to join the event.");
        }
    };
    const getUserEvents = async (params) => {
        setLoading(true);
        setError(null);
        try {
            if (!user?.id) {
                throw new Error("User ID is not available.");
            }
            const { category = "", date = "", sortBy = "date" } = params;
            const events = await fetchUserEvents(user?.id, {
                category,
                date,
                sortBy,
            });
            setUserEvents(events);
        }
        catch (err) {
            console.error("Error fetching events:", err);
            setError(err.message || "Failed to fetch events.");
        }
        finally {
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
            const totalEvents = await fetchUserEvents(user?.id, {});
            setUserTotalEvents(totalEvents);
        }
        catch (err) {
            console.error("Error fetching events:", err.response || err);
            setError(err.message || "Failed to fetch events.");
        }
        finally {
            setLoading(false);
        }
    };
    const getUserGroups = async (params) => {
        setLoading(true);
        setError(null);
        try {
            const { category, sortBy = "popular" } = params;
            const groups = await fetchUserGroups(user?.id, { category, sortBy });
            setUserGroups(groups);
        }
        catch (err) {
            console.error("Error fetching groups:", err);
            setError("Failed to fetch groups.");
        }
        finally {
            setLoading(false);
        }
    };
    const getUserTotalGroups = async () => {
        setLoading(true);
        setError(null);
        try {
            const totalGroups = await fetchUserGroups(user.id, {});
            setUserTotalGroups(totalGroups);
        }
        catch (err) {
            console.error("Error fetching groups", err);
            setError("Failed to fetch groups");
        }
        finally {
            setLoading(false);
        }
    };
    function isUserAttendingEvent(id) {
        const isAttending = user?.userEvents?.includes(String(id));
        return isAttending || false;
    }
    return (_jsx(UserContext.Provider, { value: {
            user,
            setUser,
            userEvents,
            userGroups,
            loading,
            error,
            getUserEvents,
            getUserGroups,
            handleSignOut,
            patchUser,
            joinFreeEvent,
            getUserTotalEvents,
            userTotalEvents,
            userTotalGroups,
            getUserTotalGroups,
            isUserAttendingEvent,
        }, children: children }));
};
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
