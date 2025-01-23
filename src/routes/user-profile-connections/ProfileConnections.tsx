import HomeConnectionCard from "../group-members/HomeConnectionCard";
import { useConnections } from "../../contexts/ConnectionsContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { ClipLoader } from "react-spinners";

const ProfileConnections = () => {
  const { connections, loading, error } = useConnections();
  const handleConnectionClick = useHandleConnectionClick();
  const connectionsLength = connections?.length;

  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10">
      <h3 className="font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8">
        Your Connections (
        <span className="text-primary">{connectionsLength}</span>)
      </h3>

      {loading ? (
        <div className="w-full flex justify-center items-center h-[100px]">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="w-full text-red-500 text-center mt-4">{error}</div>
      ) : connectionsLength > 0 ? (
        <div className="flex flex-row items-start justify-start gap-3 flex-wrap">
          {connections.map((connection, index) => (
            <HomeConnectionCard
              connection={connection}
              key={index}
              handleClick={handleConnectionClick}
            />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-gray-500 text-center">No connections to show...</p>
        )
      )}
    </div>
  );
};

export default ProfileConnections;
