import { useNavigate } from "react-router-dom";
import EventsPreviewCard from "./EventsPreviewCard";
import { useEffect } from "react";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import { useUser } from "../../contexts/UserContext";
import { ClipLoader } from "react-spinners";

const UserEventsPreview = () => {
  const { userTotalEvents, getUserTotalEvents, loading, error } = useUser();
  const navigate = useNavigate();
  const handleEventClick = useHandleEventClick();

  const eventsLength = Array.isArray(userTotalEvents)
    ? userTotalEvents.length
    : 0;

  const slicedEvents = Array.isArray(userTotalEvents)
    ? userTotalEvents
        .sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        })
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (getUserTotalEvents) {
      getUserTotalEvents();
    }
  }, []);

  function handleNavigation() {
    navigate("/user/my-events");
  }

  return (
    <div className="w-[100%] min-h-[380px] xl-screen:min-h-[300px] flex flex-col rounded-lg bg-white p-4 xl-screen:p-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary tablet:text-[14px] desktop:text-[16px] xl-screen:text-[18px]">
          Your Events (<span className="text-primary">{eventsLength || 0}</span>
          )
        </h3>
        <p
          className="text-[12px] xl-screen:text-[14px] font-semibold text-primary cursor-pointer"
          onClick={handleNavigation}
        >
          Show all
        </p>
      </div>
      <div className="mt-4 space-y-4">
        {loading && (
          <div className="flex items-center justify-center h-[250px] mx-auto  my-auto">
            <ClipLoader size={60} color={"#5d9b9b"} />
          </div>
        )}
        {error && (
          <p className="text-red-500 text-center">
            Something went wrong. Please try again later.
          </p>
        )}
        {!loading && !error && slicedEvents.length > 0
          ? slicedEvents.map((event) => (
              <EventsPreviewCard
                event={event}
                key={event.id}
                handleClick={handleEventClick}
              />
            ))
          : !loading &&
            !error && (
              <p className="text-gray-500 text-center">No upcoming events</p>
            )}
      </div>
    </div>
  );
};

export default UserEventsPreview;
