import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, } from "react";
import { fetchUserConnection } from "../../utils/api/user-api";
import { useUser } from "./UserContext";
const ConnectionContext = createContext(null);
export const ConnectionsProvider = ({ children, }) => {
    const [connections, setConnections] = useState([]);
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useUser();
    const getAllConnections = async () => {
        if (!user?.id) {
            setError("User is not defined.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const userConnections = await fetchUserConnection(user.id);
            setConnections(userConnections);
        }
        catch (err) {
            console.error("Error fetching connections:", err);
            setError("Failed to fetch connections.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleConnectionQuery = (value) => {
        const filteredArr = connections.filter((connection) => connection.username.toLowerCase().includes(value.toLowerCase()));
        setFilteredConnections(filteredArr);
    };
    useEffect(() => {
        setFilteredConnections(connections);
    }, [connections]);
    return (_jsx(ConnectionContext.Provider, { value: {
            connections,
            setConnections,
            filteredConnections,
            setFilteredConnections,
            getAllConnections,
            loading,
            error,
            handleConnectionQuery,
        }, children: children }));
};
export const useConnections = () => {
    const context = useContext(ConnectionContext);
    if (!context) {
        throw new Error("useConnections must be used within a ConnectionsProvider");
    }
    return context;
};
