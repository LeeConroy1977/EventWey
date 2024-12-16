import HomeConnectionCard from "../../components/HomeConnectionCard";
import { useConnection } from "../../contexts/ConnectionContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";

const ConnectionConnections = () => {
  const { connection, connectionConnections } = useConnection();
  const handleConnectionClick = useHandleConnectionClick();

  const connectionsLength = connectionConnections?.length;
  const firstName = connection?.username.split(" ")[0];

  return (
    <div className="w-[100%] min-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10 ">
      {connectionConnections && (
        <>
          <h3 className="font-bold text-textPrimary text-[1rem] mb-8">
            {`${firstName}'s Connections`} (
            <span className="text-primary">{connectionsLength || 0}</span>)
          </h3>
          <div className="flex flex-row items-start justify-start gap-3 flex-wrap ">
            {connectionConnections?.length > 0 ? (
              connectionConnections?.map((connection, i) => {
                return (
                  <HomeConnectionCard
                    connection={connection}
                    key={i}
                    handleClick={handleConnectionClick}
                  />
                );
              })
            ) : (
              <p>No Upcoming Events To Show...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectionConnections;
