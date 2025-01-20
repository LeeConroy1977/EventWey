import { useEffect } from "react";
import { useConnections } from "../../contexts/ConnectionsContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import HomeConnectionCard from "../group-members/HomeConnectionCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const UserConnection = () => {
  const {
    connections,
    getAllConnections,
    loading,
    error,
    handleConnectionQuery,
    filteredConnections,
  } = useConnections();
  const { isMobile } = useScreenWidth();

  const handleConnectionClick = useHandleConnectionClick();

  useEffect(() => {
    getAllConnections();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col desktop:flex-row items-start justify-start flex-wrap  gap-3 bg-bgPrimary desktop:pl-12 desktop:py-6 desktop:mt-4">
      {isMobile && (
        <>
          <h2 className="text-[14px] font-bold text-textPrimary mb-1 mr-auto mt-4 pl-6">
            Your connections (
            <span className="text-primary">{connections?.length}</span>)
          </h2>
          <div className="w-full flex flex-row items-start justify-start flex-wrap gap-3 pl-6 pb-4">
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
        </>
      )}
      {!isMobile &&
        filteredConnections &&
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
