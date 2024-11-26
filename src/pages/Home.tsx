import { useSearchParams } from "react-router-dom";
import HomeEventsCard from "../components/HomeEventsCard";
import { useUser } from "../contexts/UserContext";
import { useEvents } from "../contexts/EventsContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { events, setEvents, fetchEvents, loading, error } = useEvents();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");

  console.log("Search Params:", category, date, sortBy);

  // const { category, date, sortBy } = useParams<{
  //   category: string | undefined;
  //   date: string | undefined;
  //   sortBy: string | undefined;
  // }>();

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
      {type === null || (type === "events" && events && events.length > 0)
        ? events.map((event) => {
            return <HomeEventsCard event={event} key={event.id} />;
          })
        : null}
      {/* {type === "Groups" &&
        groups &&
        groups.map((group) => {
          return <HomeEventsCard event={group} key={group.id} />;
        })} */}
    </div>
  );
};

export default Home;
