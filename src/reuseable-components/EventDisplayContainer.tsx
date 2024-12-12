import React, { useEffect, useState } from "react";
import LandingEventCard from "../components/LandingEventCard";
import { fetchSortedEvents } from "../../utils/api";
import useHandleEventClick from "../hooks/useHandleEventClick";

interface Event {
  id: number;
  title: string;
  image: string;
}

interface EventDisplayContainerProps {
  title: string;
  sortBy: string;
  listName: string;
  handleClick: () => void;
}

const EventDisplayContainer: React.FC<EventDisplayContainerProps> = ({
  title,
  sortBy,
  listName,
  handleClick,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleEventClick = useHandleEventClick();

  const handleSelect = (sortBy: string) => {
    handleClick({
      target: { value: sortBy },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchEvents = async () => {
      try {
        const fetchedEvents = await fetchSortedEvents(sortBy);
        setEvents(fetchedEvents.slice(0, 4));
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [sortBy]);

  return (
    <div className="w-[100%] mt-8 gap-x-4">
      {events && (
        <>
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-[20px] text-textPrimary font-bold">{title}</h3>
            <p
              className="text-[14px] text-primary font-semibold cursor-pointer"
              onClick={() => handleSelect(sortBy)}
            >
              {`See all ${listName} events`}
            </p>
          </div>
          <div className="w-[100%] flex justify-between mt-4">
            {events.map((event, i) => {
              return (
                <LandingEventCard
                  event={event}
                  key={i}
                  handleClick={handleEventClick}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default EventDisplayContainer;
