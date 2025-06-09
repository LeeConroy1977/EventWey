import React, { useEffect, useState } from "react";
import LandingEventCard from "../routes/landing-page/LandingEventCard";
import { fetchSortedEvents } from "../../utils/api/events-api";
import useHandleEventClick from "../hooks/useHandleEventClick";
import { ClipLoader } from "react-spinners";
import { Event } from "../types/event";

interface EventDisplayContainerProps {
  title: string;
  sortBy: string;
  listName: string;
  handleClick: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
    <div className="w-[100%] mt-2 tablet:mt-8  desktop:mt-8  xl-screen:mt-12 gap-x-4">
      {loading ? (
        <div className="flex justify-center items-center tablet:h-[350px] desktop:h-[390px] xl-screen:h-[420px] ">
          <ClipLoader size={50} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        <>
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-[16px] tablet:text-[20px] xl-screen:text-[22px]  text-textPrimary font-bold">
              {title}
            </h3>
            <p
              className="text-[12px] tablet:text-[14px] desktop:text-[16px]  xl-screen:text-[16px]  text-primary font-semibold cursor-pointer"
              onClick={() => handleSelect(sortBy)}>
              {`See all ${listName} events`}
            </p>
          </div>

          <div className="w-[100%] flex flex-col tablet:flex-row tablet:justify-between mt-6 tablet:mt-4 desktop:mt-8 ">
            {events.map((event, i) => (
              <LandingEventCard
                event={event}
                key={i}
                handleClick={handleEventClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EventDisplayContainer;
