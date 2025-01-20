import { useSearchParams } from "react-router-dom";
import { useEvents } from "../../contexts/EventsContext";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const UserEvents = () => {
  const { user, userEvents, loading, error, getUserEvents } = useUser();
  const { isMobile } = useScreenWidth();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");

  const handleEventClick = useHandleEventClick();

  useEffect(() => {
    const params = {
      category,
      date,
      sortBy,
    };
    getUserEvents(params);
  }, [category, date, sortBy]);

  return (
    <div className="w-full min-h-screen bg-bgSecondary px-6 desktop:px-0 pb-6 ">
      {isMobile && (
        <h2 className="text-[14px] font-bold text-textPrimary mb-4 mr-auto mt-4">
          Your events (
          <span className="text-primary">{userEvents?.length}</span>)
        </h2>
      )}

      {userEvents &&
        userEvents.length > 0 &&
        userEvents.map((event) => {
          return (
            <HomeEventsCard
              event={event}
              key={event.id}
              handleClick={handleEventClick}
            />
          );
        })}
    </div>
  );
};

export default UserEvents;
