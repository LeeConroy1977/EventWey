import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, } from "react";
import { fetchAllUsers } from "../../utils/api/user-api";
import { fetchGroupById, fetchGroupMembers, fetchGroupEventsById, patchGroup, deleteGroup, } from "../../utils/api/groups-api";
const GroupContext = createContext(null);
export const GroupProvider = ({ children }) => {
    const [group, setGroup] = useState(null);
    const [groupEvents, setGroupEvents] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [groupOrganiser, setGroupOrganiser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const getGroupById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchGroupById(id);
            const users = await fetchAllUsers();
            const organisers = users.filter((user) => data.groupAdmin.includes(user.id));
            const organiser = organisers[0] || null;
            setGroup(data);
            setGroupOrganiser(organiser);
        }
        catch (err) {
            setError(err.message || "Failed to fetch group");
        }
        finally {
            setLoading(false);
        }
    };
    const getEventsById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const eventsData = await fetchGroupEventsById(id);
            setGroupEvents(eventsData);
        }
        catch (err) {
            setError(err.message || "Failed to fetch group events");
        }
        finally {
            setLoading(false);
        }
    };
    const getGroupMembers = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const membersData = await fetchGroupMembers(id);
            setGroupMembers(membersData);
        }
        catch (err) {
            setError(err.message || "Failed to fetch group members");
        }
        finally {
            setLoading(false);
        }
    };
    const updateGroup = async (field, value) => {
        try {
            setLoading(true);
            setError(null);
            const updatedGroup = await patchGroup(group?.id, { [field]: value });
            setGroup(updatedGroup);
        }
        catch (err) {
            console.error(`Error updating group field ${field}:`, err);
            setError(`Failed to update ${field}.`);
        }
        finally {
            setLoading(false);
        }
    };
    const removeGroup = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await deleteGroup(id);
        }
        catch (err) {
            console.error("Error deleting group", err);
            setError("Failed to delete.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(GroupContext.Provider, { value: {
            group,
            setGroup,
            groupEvents,
            setGroupEvents,
            groupMembers,
            setGroupMembers,
            groupOrganiser,
            setGroupOrganiser,
            getGroupById,
            getEventsById,
            getGroupMembers,
            error,
            loading,
            updateGroup,
            removeGroup,
        }, children: children }));
};
export const useGroup = () => {
    const context = useContext(GroupContext);
    if (!context) {
        throw new Error("useGroup must be used within a GroupProvider");
    }
    return context;
};
