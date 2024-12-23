import { useConnection } from "../../contexts/ConnectionContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";

const ConnectionEvents = () => {
  const { connection, connectionEvents } = useConnection();
  const handleEventClick = useHandleEventClick();

  const eventsLength = connectionEvents?.length;

  const firstName = connection?.username.split(" ")[0];

  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10">
      {connectionEvents && (
        <>
          <h3 className="font-bold text-textPrimary text-[1rem] mb-8">
            {`${firstName}'s Upcoming Events`} (
            <span className="text-primary">{eventsLength || 0}</span>)
          </h3>
          {connectionEvents.length > 0 ? (
            connectionEvents.map((event, i) => {
              return (
                <HomeEventsCard
                  event={event}
                  key={i}
                  handleClick={handleEventClick}
                />
              );
            })
          ) : (
            <p>No Upcoming Events To Show...</p>
          )}
        </>
      )}
    </div>
  );
};

export default ConnectionEvents;
