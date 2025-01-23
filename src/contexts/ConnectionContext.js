import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { fetchConnectionById, fetchConnectionConnections, fetchConnectionEvents, fetchConnectionGroups, } from "../../utils/api/connection-api";
const ConnectionContext = createContext(null);
export const ConnectionProvider = ({ children, }) => {
    const [connection, setConnection] = useState(null);
    const [connectionEvents, setConnectionEvents] = useState(null);
    const [connectionGroups, setConnectionGroups] = useState(null);
    const [connectionConnections, setConnectionConnections] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const getConnectionById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchConnectionById(id);
            setConnection(data);
        }
        catch (err) {
            const errorMessage = err.message || "Failed to fetch connection";
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    const getConnectionConnections = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchConnectionConnections(id);
            setConnectionConnections(data);
        }
        catch (err) {
            const errorMessage = err.message || "Failed to fetch connections";
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    const getConnectionEvents = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchConnectionEvents(id);
            setConnectionEvents(data);
        }
        catch (err) {
            const errorMessage = err.message || "Failed to fetch events";
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    const getConnectionGroups = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchConnectionGroups(id);
            setConnectionGroups(data);
        }
        catch (err) {
            const errorMessage = err.message || "Failed to fetch groups";
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(ConnectionContext.Provider, { value: {
            connection,
            connectionGroups,
            connectionEvents,
            connectionConnections,
            getConnectionById,
            getConnectionConnections,
            getConnectionEvents,
            getConnectionGroups,
            error,
            loading,
            setConnection,
            setConnectionGroups,
            setConnectionEvents,
            setConnectionConnections,
        }, children: children }));
};
export const useConnection = () => {
    const context = useContext(ConnectionContext);
    if (!context) {
        throw new Error("useConnection must be used within a ConnectionProvider");
    }
    return context;
};
