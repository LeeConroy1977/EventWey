import React, { createContext, useContext, useState, ReactNode } from "react";

import { fetchAllEvents } from "../../utils/api";

interface PriceBand {
  type: "Early bird" | "Standard" | "Standing" | "Seated" | "VIP";
  price: string;
}

interface Location {
  placename: string;
  lng: number;
  lat: number;
}

export interface Event {
  id: number;
  image: string;
  title: string;
  date: string;
  groupName: string;
  groupId: number;
  duration: string;
  priceBands: PriceBand;
  going: number;
  capacity: number;
  availability: number;
  free: boolean;
  category: string;
  tags: string[];
  description: string[];
  attendeesId: number[];
  location: Location;
}

interface EventsContextType {
  events: Event[];
  setEvents: (events: Event[]) => void;
  fetchEvents: (params: { [key: string]: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  setEvents: () => {},
  fetchEvents: async () => {},
  loading: false,
  error: null,
});

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (params: { [key: string]: string }) => {
    setLoading(true);
    setError(null);
    try {
      const { category, date, sortBy = "date" } = params;
      const eventsData = await fetchAllEvents({ category, date, sortBy });
      setEvents(eventsData);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventsContext.Provider
      value={{ events, setEvents, fetchEvents, loading, error }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
