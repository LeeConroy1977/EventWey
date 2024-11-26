import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import EventsPreviewCard from "./EventsPreviewCard";
import { useEffect } from "react";

const UserEventsPreview = () => {
  const { user, userEvents, loading, error, getUserEvents } = useUser();
  const navigate = useNavigate();

  const eventsLength = Array.isArray(userEvents) ? userEvents.length : 0;

  const slicedEvents = Array.isArray(userEvents)
    ? userEvents
        .sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        })
        .slice(0, 3)
    : [];

  useEffect(() => {
    getUserEvents();
  }, []);

  function handleNavigation() {
    navigate("/user/my-events");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-[100%] h-[380px] flex flex-col rounded-lg bg-white p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary">
          Your Events(
          <span className="text-primary">{eventsLength}</span>)
        </h3>
        <p
          className="text-[12px] font-semibold text-primary cursor-pointer"
          onClick={handleNavigation}
        >
          Show all
        </p>
      </div>
      <div className="mt-4 space-y-2">
        {slicedEvents.length > 0 ? (
          slicedEvents.map((event) => (
            <EventsPreviewCard event={event} key={event.id} />
          ))
        ) : (
          <p>No upcoming events</p>
        )}
      </div>
    </div>
  );
};

export default UserEventsPreview;
