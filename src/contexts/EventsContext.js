import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { fetchAllEvents } from "../../utils/api/events-api";
const EventsContext = createContext(undefined);
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [reviewEvents, setReviewEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchEvents = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const { category, date, sortBy = "date" } = params;
      const eventsData = await fetchAllEvents({ category, date, sortBy });
      const approvedEvents = eventsData.filter(
        (event) => event.approved === true
      );
      setEvents(approvedEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };
  const fetchReviewEvents = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const eventsData = await fetchAllEvents({});
      const reviewEvents = eventsData.filter(
        (event) => event.approved === false
      );
      setReviewEvents(reviewEvents);
    } catch (err) {
      console.error("Error fetching review events:", err);
      setError("Failed to fetch review events.");
    } finally {
      setLoading(false);
    }
  };
  return _jsx(EventsContext.Provider, {
    value: {
      events,
      setEvents,
      fetchEvents,
      loading,
      error,
      reviewEvents,
      fetchReviewEvents,
    },
    children: children,
  });
};
export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
