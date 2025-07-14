import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useRef,
} from "react";

import { Event } from "../types/event";
import { fetchAllEvents } from "../../utils/api/events-api";

const debounce = <F extends (...args: any[]) => any>(fn: F, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

interface EventsContextType {
  events: Event[];
  reviewEvents: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  fetchEvents: (params: {
    category?: string | null;
    date?: string | null;
    sortBy?: string | null;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  fetchReviewEvents: (params: Record<string, string>) => Promise<void>;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
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
  const [hasMore, setHasMore] = useState(true);
  const [currentParams, setCurrentParams] = useState<{
    category?: string | null;
    date?: string | null;
    sortBy?: string | null;
  }>({});

  const fetchedPages = useRef<Set<number>>(new Set());

  const debouncedFetchEvents = debounce(
    async (params: {
      category?: string | null;
      date?: string | null;
      sortBy?: string | null;
      page?: number;
      limit?: number;
    }) => {
      const { category, date, sortBy = "date", page = 1, limit = 15 } = params;

      if (loading || (!hasMore && page !== 1)) return;

      if (
        category !== currentParams.category ||
        date !== currentParams.date ||
        sortBy !== currentParams.sortBy
      ) {
        setEvents([]);
        setHasMore(true);
        fetchedPages.current.clear();
        setCurrentParams({ category, date, sortBy });
      }

      if (fetchedPages.current.has(page)) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let allApprovedEvents: Event[] = [];
        let currentPage = page;
        let totalFetched = 0;
        const maxFetch = 100; // Safety limit

        // Fetch until 15 approved events or no more
        while (allApprovedEvents.length < limit && totalFetched < maxFetch) {
          const eventsData = await fetchAllEvents({
            category,
            date,
            sortBy,
            limit,
            page: currentPage,
          });

          const approvedEvents = eventsData.filter(
            (event: Event) => event.approved === true
          );

          allApprovedEvents.push(...approvedEvents);
          totalFetched += eventsData.length;
          fetchedPages.current.add(currentPage);
          if (eventsData.length < limit) break; // No more events
          currentPage++;
        }

        const newApprovedEvents = allApprovedEvents.slice(0, limit);
        setEvents((prevEvents) => {
          const prevIds = new Set(prevEvents.map((e) => e.id));
          const newEvents = newApprovedEvents.filter((e) => !prevIds.has(e.id));
          const updatedEvents = [...prevEvents, ...newEvents];

          return updatedEvents;
        });

        setHasMore(
          allApprovedEvents.length >= limit && totalFetched < maxFetch
        );
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events.");
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    300
  );

  const fetchReviewEvents = async (params: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      const eventsData = await fetchAllEvents(params);
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
        fetchEvents: debouncedFetchEvents,
        loading,
        error,
        reviewEvents,
        fetchReviewEvents,
        hasMore,
      }}>
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
