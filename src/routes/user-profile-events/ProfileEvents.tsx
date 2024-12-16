import HomeEventsCard from "../../components/HomeEventsCard";
import { useUser } from "../../contexts/UserContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";

const ProfileEvents = () => {
  const { userEvents } = useUser();
  const handleEventClick = useHandleEventClick();
  const eventsLength = userEvents?.length;
  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10">
      {userEvents && (
        <>
          <h3 className="font-bold text-textPrimary text-[1rem] mb-8">
            {`Your Upcoming Events`} (
            <span className="text-primary">{eventsLength || 0}</span>)
          </h3>
          {userEvents?.length > 0 ? (
            userEvents?.map((event, i) => {
              return (
                <HomeEventsCard
                  event={event}
                  key={i}
                  handleClick={handleEventClick}
                />
              );
            })
          ) : (
            <p>You Have No Upcoming Events To Show...</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileEvents;
