import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  deleteEvent,
  fetchEventById,
  fetchEventConnections,
  fetchEventGroupById,
  patchEvent,
} from "../../utils/api/events-api";
import {User} from '../types/user'
import {Event} from '../types/event'
import {Group} from '../types/group'


interface EventContextType {
  event: Event | null;
  setEvent: (event: Event) => void;
  eventGroup: Group | null;
  setEventGroup: (group: Group) => void;
  eventConnections: User[] | null;
  setEventConnections: (users: User[]) => void;
  getEventById: (id: string) => Promise<void>;
  getGroupById: (id: string) => Promise<void>;
  updateEvent: (field: keyof Event, value: any) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
  getEventConnections: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

interface EventProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [eventGroup, setEventGroup] = useState<Group | null>(null);
  const [eventConnections, setEventConnections] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getEventById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventById(id);
      setEvent(data);
      setEventGroup(data.group)
    } catch (err: any) {
      setError(err.message || "Failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  const getGroupById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventGroupById(id);
      if (data === null) {
        setEventGroup(null);
        console.warn(`No group found for event ${id}`);
      } else {
        console.log(data, 'event group xxxxxxxxxxxxxxxx')
        setEventGroup(data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch group");
      setEventGroup(null); 
    } finally {
      setLoading(false);
    }
  };

  const getEventConnections = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      // @ts-ignore
      const data = await fetchEventConnections(id);
      console.log(data, 'xxxxxxxxxxxxxxxxxxxxxxxxxx')
      setEventConnections(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch connections");
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (field: keyof Event, value: any) => {
    if (!event) {
      setError("No event selected to update");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const updatedEvent = await patchEvent(String(event.id), { [field]: value });
      setEvent(updatedEvent);
    } catch (err) {
      console.error(`Error updating event field ${field}:`, err);
      setError(`Failed to update ${field}.`);
    } finally {
      setLoading(false);
    }
  };

  const removeEvent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteEvent(id);
      setEvent(null);
    } catch (err) {
      console.error("Error deleting event", err);
      setError("Failed to delete the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        event,
        setEvent,
        eventGroup,
        setEventGroup,
        eventConnections,
        setEventConnections,
        getEventById,
        getGroupById,
        updateEvent,
        removeEvent,
        getEventConnections,
        loading,
        error,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
