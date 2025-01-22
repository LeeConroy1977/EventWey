import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import { fetchAllEvents } from "../../utils/api/events-api";

interface PriceBand {
  type: "Early bird" | "Standard" | "VIP";
  price: string;
  ticketCount: number;
}

interface Location {
  placename: string;
  lng: number;
  lat: number;
}

export interface Event {
  id: string;
  image: string;
  title: string;
  date: string;
  groupName: string;
  groupId: number;
  duration: string;
  priceBands: PriceBand[];
  going: number;
  capacity: number;
  availability: number;
  free: boolean;
  category: string;
  tags: string[];
  description: string[];
  attendeesId: string[];
  location: Location;
  approved: boolean;
}

interface EventsContextType {
  events: Event[];
  reviewEvents: Event[];
  setEvents: (events: Event[]) => void;
  fetchEvents: (params: Record<string, string>) => Promise<void>;
  fetchReviewEvents: (params: Record<string, string>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [reviewEvents, setReviewEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (params: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      const { category, date, sortBy = "date" } = params;
      const eventsData = await fetchAllEvents({ category, date, sortBy });
      const approvedEvents = eventsData.filter(
        (event: Event) => event.approved === true
      );
      setEvents(approvedEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewEvents = async (params: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      const eventsData = await fetchAllEvents({});
      const reviewEvents = eventsData.filter(
        (event: Event) => event.approved === false
      );
      setReviewEvents(reviewEvents);
    } catch (err) {
      console.error("Error fetching review events:", err);
      setError("Failed to fetch review events.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        fetchEvents,
        loading,
        error,
        reviewEvents,
        fetchReviewEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
