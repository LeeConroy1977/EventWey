import HomeConnectionCard from "../group-members/HomeConnectionCard";
import { useConnections } from "../../contexts/ConnectionsContext";
import { useUser } from "../../contexts/UserContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";

const ProfileConnections = () => {
  const { connections } = useConnections();
  const handleConnectionClick = useHandleConnectionClick();
  const connectionsLength = connections?.length;

  return (
    <div className="w-[100%] min-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10 ">
      {connections && (
        <>
          <h3 className="font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8">
            {`Your Connections`} (
            <span className="text-primary">{connectionsLength || 0}</span>)
          </h3>
          <div className="flex flex-row items-start justify-start gap-3 flex-wrap ">
            {connections?.length > 0 ? (
              connections?.map((connection, i) => {
                return (
                  <HomeConnectionCard
                    connection={connection}
                    key={i}
                    handleClick={handleConnectionClick}
                  />
                );
              })
            ) : (
              <p>No Connections To Show...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileConnections;
