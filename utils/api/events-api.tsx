import axios from "axios";
import { sortByPopularity, sortByDate, sortByFree } from "../fakeEventSorting";

import { eventsDateFilter } from "../eventDateFilter";

export const fetchAllEvents = async (params: {
  category?: string;
  date?: string;
  sortBy?: string;
}): Promise<any[]> => {
  try {
    const response = await axios.get("http://localhost:3000/events");
    let filteredData = response.data;

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
    const response = await axios.get(`http://localhost:3000/events/${id}`);
    const event = response.data;

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
    const { data: event } = await axios.get(
      `http://localhost:3000/events/${id}`
    );

    const patchedEvent = {
      ...event,

      going: patchObj.going !== undefined ? patchObj.going : event.going,
      availability:
        patchObj.availability !== undefined
          ? patchObj.availability
          : event.availability,
    };
    const { data: updatedEvent } = await axios.patch(
      `http://localhost:3000/events/${id}`,
      patchedEvent
    );

    return updatedEvent;
  } catch (err) {
    console.error(`Error updating event ${id}:`, err);
    throw err;
  }
};

export const postEvent = async (eventData): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/events",
      eventData
    );

    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const fetchEventConnections = async (id: string): Promise<User[]> => {
  try {
    const eventResponse = await axios.get<Event>(
      `http://localhost:3000/events/${id}`
    );
    const event = eventResponse?.data;

    if (!event || !Array.isArray(event.attendees)) {
      throw new Error(
        `Invalid event data or attendees not found for event with ID: ${id}`
      );
    }

    const usersResponse = await axios.get<User[]>(
      "http://localhost:3000/users"
    );
    const users = usersResponse.data;

    if (!Array.isArray(users)) {
      throw new Error("Invalid user data received from API");
    }

    const eventConnections = users.filter((user) =>
      event.attendees.includes(String(user.id))
    );

    return eventConnections;
  } catch (error) {
    console.error("Error fetching event connections:", error.message);
    throw error;
  }
};

export const fetchEventGroupById = async (id: string): Promise<any> => {
  try {
    const eventResponse = await axios.get(`http://localhost:3000/events/${id}`);
    const event = eventResponse.data;

    console.log("Event Data:", event);
    if (!event?.groupId) {
      throw new Error(`Group ID not found for event with ID: ${id}`);
    }

    const groupId = String(event.groupId);

    const groupResponse = await axios.get(
      `http://localhost:3000/groups/${groupId}`
    );

    return groupResponse.data;
  } catch (error) {
    console.error("Error fetching event group by ID:", error);
    throw error;
  }
};

export const fetchSortedEvents = async (sortBy: string): Promise<any[]> => {
  try {
    const eventsResponse = await axios.get("http://localhost:3000/events");
    const events = eventsResponse.data;

    const randomArray = (array: any[]) => {
      return array.sort(() => Math.random() - 0.5);
    };

    let sortedEvents: any[] = [];

    if (sortBy === "popular") {
      sortedEvents = events.sort((a, b) => b.going - a.going);
    } else if (sortBy === "date") {
      sortedEvents = events.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortBy === "free") {
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
