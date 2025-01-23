import { useEffect } from "react";
import { useEvents } from "../../contexts/EventsContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";
import { ClipLoader } from "react-spinners";

const AdminEvents = () => {
  const { reviewEvents, fetchReviewEvents, loading, error } = useEvents();
  const handleEventClick = useHandleEventClick();

  useEffect(() => {
    fetchReviewEvents({});
  }, []);
  return (
    <div className="w-full min-h-screen bg-bgSecondary mt-6 tablet:mt-0 px-6 tablet:px-0 tablet:mb-4">
      {loading && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center mt-6">
          <p>Something went wrong. Please try again later.</p>
        </div>
      )}
      {!loading &&
        !error &&
        reviewEvents &&
        reviewEvents.length > 0 &&
        reviewEvents.map((event) => (
          <HomeEventsCard
            // @ts-ignore
            event={event}
            key={event.id}
            handleClick={handleEventClick}
          />
        ))}
      {!loading && !error && reviewEvents && reviewEvents.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          <p>No events available for review at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
