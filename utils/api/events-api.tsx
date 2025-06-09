import axios from "axios";
import { sortByPopularity, sortByDate, sortByFree } from "../fakeEventSorting";

import { eventsDateFilter } from "../eventDateFilter";

const API = "https://eventwey-backend.onrender.com";

const axiosInstance = axios.create({
  baseURL: API,
});

export const fetchAllEvents = async (params: {
  category?: string;
  date?: string;
  sortBy?: string;
}): Promise<any[]> => {
  try {
    const response = await axios.get(`${API}/events`);

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
    const response = await axiosInstance.get(`/events/${id}`);
    const event = response.data;
    console.log(`Event data for ID ${id}:`, event);
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
    const eventAttendees = await axios.get(`${API}/events/${id}/attendees`);

    console.log(eventAttendees);
    return eventAttendees.data;
  } catch (error) {
    // @ts-ignore
    console.error("Error fetching event attendees:", error.message);
    throw error;
  }
};
export const fetchEventGroupById = async (id: string): Promise<any> => {
  try {
    const eventGroupResponse = await axiosInstance.get(`/events/${id}/group`);
    const group = eventGroupResponse.data;

    if (group) {
      console.warn(`No group found for event with ID: ${id}, returning null`);
      return null;
    }

    return group;
  } catch (error) {
    console.error("Error fetching event group by ID:", error);
    throw error;
  }
};
export const fetchSortedEvents = async (sortBy: string): Promise<any[]> => {
  try {
    const eventsResponse = await axios.get(`${API}/events`, {
      params: { sortBy },
    });
    const sortedEvents = eventsResponse.data;
    return sortedEvents;
  } catch (error) {
    console.error("Error fetching sorted events:", error);
    throw error;
  }
};
