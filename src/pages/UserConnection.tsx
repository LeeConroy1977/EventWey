import { useEffect } from "react";
import { useConnections } from "../contexts/ConnectionsContext";
import HomeConnectionCard from "../components/HomeConnectionCard";
import useHandleConnectionClick from "../hooks/useHandleConnectionClick";

const UserConnection = () => {
  const {
    connections,
    getAllConnections,
    loading,
    error,
    handleConnectionQuery,
    filteredConnections,
  } = useConnections();

  const handleConnectionClick = useHandleConnectionClick();

  useEffect(() => {
    getAllConnections();
  }, []);

  return (
    <div className="w-full min-h-screen flex items-start justify-center flex-wrap  gap-3 bg-bgSecondary mt-4">
      {filteredConnections &&
        filteredConnections.length > 0 &&
        filteredConnections.map((connection) => {
          return (
            <HomeConnectionCard
              connection={connection}
              key={connection.id}
              handleClick={handleConnectionClick}
            />
          );
        })}
    </div>
  );
};

export default UserConnection;
