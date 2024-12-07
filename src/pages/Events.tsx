import {
  useSearchParams,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import HomeEventsCard from "../components/HomeEventsCard";
import { useEvents } from "../contexts/EventsContext";
import { useEffect } from "react";
import useHandleEventClick from "../hooks/useHandleEventClick";
import { Event } from "../contexts/EventsContext";

const Home = () => {
  const { events, setEvents, fetchEvents, loading, error } = useEvents();
  const [searchParams] = useSearchParams();
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
    <div className="w-full min-h-screen bg-bgSecondary">
      {events &&
        events.length > 0 &&
        events.map((event: Event) => {
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

export default Home;
