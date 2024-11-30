import {
  useSearchParams,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import HomeEventsCard from "../components/HomeEventsCard";
import { useEvents } from "../contexts/EventsContext";
import { useEffect } from "react";

const Home = () => {
  const { events, setEvents, fetchEvents, loading, error } = useEvents();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");

  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      category,
      date,
      sortBy,
    };
    fetchEvents(params);
  }, [category, date, sortBy]);

  function handleEventClick(id) {
    navigate(`/user/events/${id}`);
  }

  return (
    <div className="w-full min-h-screen bg-bgSecondary">
      {events &&
        events.length > 0 &&
        events.map((event) => {
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
