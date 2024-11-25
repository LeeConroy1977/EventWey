import { useEffect, useState } from "react";
import HomeEventsCard from "../components/HomeEventsCard";
import { useUser } from "../contexts/UserContext";

const Home = () => {
  // const [events, setEvents] = useState([]);
  const { events } = useUser();

  return (
    <div className="w-full min-h-screen bg-bgSecondary">
      {events &&
        events.map((event) => {
          return <HomeEventsCard event={event} key={event.id} />;
        })}
    </div>
  );
};

export default Home;
