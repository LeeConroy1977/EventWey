import { useConnection } from "../../contexts/ConnectionContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";
import { ClipLoader } from "react-spinners";

const ConnectionEvents = () => {
  const { connection, connectionEvents, loading, error } = useConnection();
  const handleEventClick = useHandleEventClick();

  const eventsLength = connectionEvents?.length;

  const firstName = connection?.username.split(" ")[0];

  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10">
      <h3 className="font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8">
        {`${firstName}'s Upcoming Events`} (
        <span className="text-primary">{eventsLength}</span>)
      </h3>

      {loading ? (
        <div className="w-full flex justify-center items-center h-[100px]">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="w-full text-red-500 text-center mt-4">{error}</div>
      ) : eventsLength > 0 ? (
        <div className="flex flex-col gap-4">
          {connectionEvents.map((event, index) => (
            <HomeEventsCard
              event={event}
              key={index}
              handleClick={handleEventClick}
            />
          ))}
        </div>
      ) : (
        !loading &&
        eventsLength > 0 && (
          <p className="text-gray-500 text-center">
            No Upcoming Events To Show...
          </p>
        )
      )}
    </div>
  );
};

export default ConnectionEvents;
