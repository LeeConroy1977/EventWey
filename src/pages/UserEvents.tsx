import { useSearchParams } from "react-router-dom";
import { useEvents } from "../contexts/EventsContext";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import HomeEventsCard from "../components/HomeEventsCard";

const UserEvents = () => {
  const { user, userEvents, loading, error, getUserEvents } = useUser();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");

  console.log("Search Params:", category, date, sortBy);

  useEffect(() => {
    const params = {
      category,
      date,
      sortBy,
    };
    getUserEvents(params);
  }, [category, date, sortBy]);

  return (
    <div className="w-full min-h-screen bg-bgSecondary">
      {userEvents &&
        userEvents.length > 0 &&
        userEvents.map((event) => {
          return <HomeEventsCard event={event} key={event.id} />;
        })}
    </div>
  );
};

export default UserEvents;
