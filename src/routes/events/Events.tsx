import { useSearchParams } from "react-router-dom";

import { useEffect } from "react";
import { useEvents } from "../../contexts/EventsContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "./HomeEventsCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const { events, setEvents, fetchEvents, loading, error } = useEvents();
  const [searchParams] = useSearchParams();
  const { isMobile } = useScreenWidth();
  const category = searchParams.get("category");
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");

  const handleEventClick = useHandleEventClick();

  useEffect(() => {
    const params: Record<string, string | null> = {
      category,
      date,
      sortBy,
    };
    fetchEvents(params);
  }, [category, date, sortBy]);

  return (
    <div className="w-full h-auto tablet:min-h-screen flex flex-col justify-start gap-y-4 tablet:gap-y-0 px-6 tablet:px-0 tablet:mt-2 mb-6 tablet:mb-0">
      {!events && !loading && (
        <div className="text-center mt-4 text-gray-500">No events found.</div>
      )}
      {loading ? (
        <div className="flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        events &&
        events.length > 0 &&
        events.map((event) => (
          <HomeEventsCard
            event={event}
            key={event.id}
            handleClick={handleEventClick}
          />
        ))
      )}
    </div>
  );
};

export default Home;
