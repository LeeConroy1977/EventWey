import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useEvents } from "../../contexts/EventsContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "./HomeEventsCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";

interface Event {
  id: string | number;
  title: string;
  date: string | number;
  category: string;
  approved: boolean;
  free?: boolean;
  going?: number;
  attendees?: (string | number)[];
  group?: any;
}

const Home = () => {
  const { events, fetchEvents, loading, error, hasMore } = useEvents();
  const [searchParams] = useSearchParams();
  const {} = useScreenWidth();
  const category = searchParams.get("category");
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");
  const handleEventClick = useHandleEventClick();
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const params = {
    category,
    date,
    sortBy: sortBy || "date",
    page: 1,
    limit: 15,
  };

  useEffect(() => {
    fetchEvents(params);
    setPage(1);
  }, [category, date, sortBy]);

  useEffect(() => {
    if (loading || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
      }
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      const nextParams = {
        category,
        date,
        sortBy: sortBy || "date",
        page,
        limit: 15,
      };

      fetchEvents(nextParams);
    }
  }, [page, category, date, sortBy]);

  return (
    <div className="w-full h-auto tablet:min-h-screen flex flex-col justify-start gap-y-4 tablet:gap-y-0 px-6 tablet:px-0 tablet:mt-2 mb-6 tablet:mb-0">
      {!events?.length && !loading && (
        <div className="text-center mt-4 text-gray-500">No events found.</div>
      )}
      {loading && page === 1 ? (
        <div className="flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        events?.length > 0 && (
          <>
            {events.map((event: Event) => (
              <HomeEventsCard
                event={event}
                key={event.id}
                handleClick={handleEventClick}
              />
            ))}
            <div ref={sentinelRef} />
            {loading && page > 1 && (
              <div className="flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8">
                <ClipLoader size={80} color={"#5d9b9b"} />
              </div>
            )}
            {!hasMore && events.length > 0 && (
              <div className="text-center mt-4 text-gray-500">
                No more events to load.
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Home;
