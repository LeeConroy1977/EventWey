import axios from "axios";
import { sortByPopularity, sortByDate, sortByFree } from "../fakeEventSorting";

import { eventsDateFilter } from "../eventDateFilter";

const API = "https://eventwey.glitch.me";

export const fetchAllEvents = async (params: {
  category?: string;
  date?: string;
  sortBy?: string;
}): Promise<any[]> => {
  try {
    const response = await axios.get(`${API}/events`);
    let filteredData = response.data;
    console.log(filteredData, "events data glitch");
    if (params.category) {
      filteredData = filteredData.filter(
        (event: any) => event.category === params.category
      );
    }

    if (params.date) {
      filteredData = eventsDateFilter(filteredData, params.date);
    }

    if (params.sortBy === "popular") {
      filteredData = sortByPopularity(filteredData);
    } else if (params.sortBy === "date") {
      filteredData = sortByDate(filteredData);
    } else if (params.sortBy === "free") {
      filteredData = sortByFree(filteredData);
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchEventById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`${API}/events/${id}`);
    const event = await response.data;

    console.log("Event Data:", event);
    if (!event) {
      throw new Error(`Event not found for ID: ${id}`);
    }

    return event;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};

export const patchEvent = async (id: string, patchObj: any): Promise<any> => {
  try {
    const { data: updatedEvent } = await axios.patch(
      `${API}/events/${id}`,
      patchObj
    );

    return updatedEvent;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<any> => {
  try {
    const { data: updatedEvent } = await axios.delete(`${API}/events/${id}`);

    return updatedEvent;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const postEvent = async (eventData: any): Promise<any> => {
  try {
    const response = await axios.post(`${API}/events`, eventData);

    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};
// @ts-ignore
export const fetchEventConnections = async (id: string): Promise<User[]> => {
  try {
    const eventResponse = await axios.get<Event>(`${API}/events/${id}`);
    const event = eventResponse?.data;
    // @ts-ignore
    if (!event || !Array.isArray(event.attendees)) {
      throw new Error(
        `Invalid event data or attendees not found for event with ID: ${id}`
      );
    }
    // @ts-ignore
    const usersResponse = await axios.get<User[]>(`${API}/users`);
    const users = usersResponse.data;

    if (!Array.isArray(users)) {
      throw new Error("Invalid user data received from API");
    }

    const eventConnections = users.filter((user) =>
      // @ts-ignore
      event.attendees.includes(String(user.id))
    );

    return eventConnections;
  } catch (error) {
    // @ts-ignore
    console.error("Error fetching event connections:", error.message);
    throw error;
  }
};

export const fetchEventGroupById = async (id: string): Promise<any> => {
  try {
    const eventResponse = await axios.get(`${API}/events/${id}`);
    const event = eventResponse.data;

    console.log("Event Data:", event);
    if (!event?.groupId) {
      throw new Error(`Group ID not found for event with ID: ${id}`);
    }

    const groupId = String(event.groupId);

    const groupResponse = await axios.get(`${API}/groups/${groupId}`);

    return groupResponse.data;
  } catch (error) {
    console.error("Error fetching event group by ID:", error);
    throw error;
  }
};

export const fetchSortedEvents = async (sortBy: string): Promise<any[]> => {
  try {
    const eventsResponse = await axios.get(`${API}/events`);
    const events = eventsResponse.data;

    const randomArray = (array: any[]) => {
      return array.sort(() => Math.random() - 0.5);
    };

    let sortedEvents: any[] = [];

    if (sortBy === "popular") {
      sortedEvents = events.sort((a: any, b: any) => b.going - a.going);
    } else if (sortBy === "date") {
      sortedEvents = events.sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortBy === "free") {
      // @ts-ignore
      sortedEvents = randomArray(events.filter((event) => event.free === true));
    } else {
      sortedEvents = events;
    }

    console.log(sortedEvents, sortBy);

    return sortedEvents;
  } catch (error) {
    console.error("Error fetching sorted events:", error);
    throw error;
  }
};
