import { useEffect } from "react";
import { useConnections } from "../../contexts/ConnectionsContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import HomeConnectionCard from "../group-members/HomeConnectionCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";

const UserConnection = () => {
  const {
    connections,
    getAllConnections,
    loading,
    error,
    filteredConnections,
  } = useConnections();
  const { isMobile } = useScreenWidth();

  const handleConnectionClick = useHandleConnectionClick();

  useEffect(() => {
    getAllConnections();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col desktop:flex-row items-start justify-start flex-wrap gap-3 bg-bgPrimary p-6 tablet:p-0 desktop:pl-12 desktop:py-6 desktop:mt-4">
      {isMobile && (
        <h2 className="text-[14px] font-bold text-textPrimary mb-1 mr-auto">
          Your connections (
          <span className="text-primary">{connections?.length || 0}</span>)
        </h2>
      )}

      {loading ? (
        <div className="w-full flex justify-center items-center h-[200px]">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="w-full text-red-500 text-center mt-4">{error}</div>
      ) : filteredConnections?.length > 0 ? (
        <div className="w-[100%] flex flex-row flex-wrap gap-3">
          {filteredConnections.map((connection) => (
            <HomeConnectionCard
              connection={connection}
              key={connection.id}
              handleClick={handleConnectionClick}
            />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="w-full text-gray-500 text-center mt-4">
            No connections found.
          </div>
        )
      )}
    </div>
  );
};

export default UserConnection;
