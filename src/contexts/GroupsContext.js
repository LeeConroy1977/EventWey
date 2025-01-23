import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, } from "react";
import { fetchAllGroups } from "../../utils/api/groups-api";
const GroupsContext = createContext({
    groups: [],
    reviewGroups: [],
    setGroups: () => { }, // Default no-op function
    fetchGroups: async () => { }, // Default empty async function
    fetchReviewGroups: async () => { }, // Default empty async function
    loading: false,
    error: null,
});
export const GroupsProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const [reviewGroups, setReviewGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchGroups = async (params) => {
        setLoading(true);
        setError(null);
        try {
            const { category, sortBy = "popular" } = params;
            const groupsData = await fetchAllGroups({ category, sortBy });
            const approvedGroups = groupsData.filter((group) => group.approved === true);
            setGroups(approvedGroups);
        }
        catch (err) {
            console.error("Error fetching groups:", err);
            setError("Failed to fetch groups.");
        }
        finally {
            setLoading(false);
        }
    };
    const fetchReviewGroups = async (params) => {
        setLoading(true);
        setError(null);
        try {
            const groupsData = await fetchAllGroups({});
            const reviewGroups = groupsData.filter((group) => group.approved === false);
            setReviewGroups(reviewGroups);
        }
        catch (err) {
            console.error("Error fetching review groups:", err);
            setError("Failed to fetch review groups.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(GroupsContext.Provider, { value: {
            groups,
            setGroups,
            fetchGroups,
            loading,
            error,
            fetchReviewGroups,
            reviewGroups,
        }, children: children }));
};
export const useGroups = () => {
    const context = useContext(GroupsContext);
    if (!context) {
        throw new Error("useGroups must be used within a GroupsProvider");
    }
    return context;
};
