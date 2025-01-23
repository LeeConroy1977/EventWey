import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { deleteEvent, fetchEventById, fetchEventConnections, fetchEventGroupById, patchEvent, } from "../../utils/api/events-api";
const EventContext = createContext(undefined);
export const EventProvider = ({ children }) => {
    const [event, setEvent] = useState(null);
    const [eventGroup, setEventGroup] = useState(null);
    const [eventConnections, setEventConnections] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const getEventById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchEventById(id);
            setEvent(data);
        }
        catch (err) {
            setError(err.message || "Failed to fetch event");
        }
        finally {
            setLoading(false);
        }
    };
    const getGroupById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchEventGroupById(id);
            setEventGroup(data);
        }
        catch (err) {
            setError(err.message || "Failed to fetch group");
        }
        finally {
            setLoading(false);
        }
    };
    const getEventConnections = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchEventConnections(id);
            setEventConnections(data);
        }
        catch (err) {
            setError(err.message || "Failed to fetch connections");
        }
        finally {
            setLoading(false);
        }
    };
    const updateEvent = async (field, value) => {
        if (!event) {
            setError("No event selected to update");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const updatedEvent = await patchEvent(event.id, { [field]: value });
            setEvent(updatedEvent);
        }
        catch (err) {
            console.error(`Error updating event field ${field}:`, err);
            setError(`Failed to update ${field}.`);
        }
        finally {
            setLoading(false);
        }
    };
    const removeEvent = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteEvent(id);
            setEvent(null);
        }
        catch (err) {
            console.error("Error deleting event", err);
            setError("Failed to delete the event.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(EventContext.Provider, { value: {
            event,
            setEvent,
            eventGroup,
            setEventGroup,
            eventConnections,
            setEventConnections,
            getEventById,
            getGroupById,
            updateEvent,
            removeEvent,
            getEventConnections,
            loading,
            error,
        }, children: children }));
};
export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvent must be used within an EventProvider");
    }
    return context;
};
