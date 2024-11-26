import { useSearchParams } from "react-router-dom";
import HomeEventsCard from "../components/HomeEventsCard";
import { useUser } from "../contexts/UserContext";

const Home = () => {
  const { events, groups } = useUser();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="w-full min-h-screen bg-bgSecondary">
      {type === "Events" &&
        events &&
        events.map((event) => {
          return <HomeEventsCard event={event} key={event.id} />;
        })}
      {type === "Groups" &&
        groups &&
        groups.map((group) => {
          return <HomeEventsCard event={group} key={group.id} />;
        })}
    </div>
  );
};

export default Home;
