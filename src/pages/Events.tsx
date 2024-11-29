import { useSearchParams } from "react-router-dom";
import HomeEventsCard from "../components/HomeEventsCard";
import { useEvents } from "../contexts/EventsContext";
import { useEffect } from "react";

const Home = () => {
  const { events, setEvents, fetchEvents, loading, error } = useEvents();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");

  useEffect(() => {
    const params = {
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
        events.map((event) => {
          return <HomeEventsCard event={event} key={event.id} />;
        })}
    </div>
  );
};

export default Home;
