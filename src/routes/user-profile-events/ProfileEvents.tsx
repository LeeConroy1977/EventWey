import { useUser } from "../../contexts/UserContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";
import { ClipLoader } from "react-spinners";

const ProfileEvents = () => {
  const { userEvents, loading, error } = useUser();
  const handleEventClick = useHandleEventClick();
  const eventsLength = userEvents?.length;
  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10">
      <h3 className="font-bold text-textPrimary mobile:text-[14px] tablet:text-[1rem] xl-screen:text-[18px] mb-8">
        Your Upcoming Events (
        <span className="text-primary">{eventsLength}</span>)
      </h3>

      {loading ? (
        <div className="w-full flex justify-center items-center h-[100px]">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="w-full text-red-500 text-center mt-4">{error}</div>
      ) : eventsLength > 0 ? (
        <div className="w-full flex flex-col gap-4">
          {userEvents.map((event, i) => (
            <HomeEventsCard
              // @ts-ignore
              event={event}
              key={i}
              handleClick={handleEventClick}
            />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-gray-500 text-center">
            You have no upcoming events to show...
          </p>
        )
      )}
    </div>
  );
};

export default ProfileEvents;
