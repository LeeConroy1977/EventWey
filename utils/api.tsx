import axios from "axios";

import { eventsData } from "../data/events";
import { eventsDateFilter } from "./eventDateFilter";
import { sortByDate, sortByPopularity, sortByFree } from "./fakeEventSorting";

console.log(eventsData);

export const createUser = async (newUser: any): Promise<any> => {
  try {
    const response = await axios.post("http://localhost:3000/users", newUser);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
export const updateUser = async (id: string, patchObj: any): Promise<any> => {
  try {
    const { data: user } = await axios.get(`http://localhost:3000/users/${id}`);
    const patchedUser = { ...user, ...patchObj };

    const { data: updatedUser } = await axios.patch(
      `http://localhost:3000/users/${id}`,
      patchedUser
    );

    console.log("Updated User Data:", updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const patchGroup = async (id: string, patchObj: any): Promise<any> => {
  try {
    const { data: group } = await axios.get(
      `http://localhost:3000/groups/${id}`
    );
    const patchedGroup = { ...group, ...patchObj };

    const { data: updatedGroup } = await axios.patch(
      `http://localhost:3000/groups/${id}`,
      patchedGroup
    );

    return updatedGroup;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const fetchAllUser = async (): Promise<any[]> => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const SignInUser = async (
  email: string,
  password: string
): Promise<any | undefined> => {
  try {
    const response = await fetchAllUser();
    const users = Array.isArray(response) ? response : [];

    console.log("Fetched users:", users);
    console.log("Input Email:", email);
    console.log("Input Password:", password);

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      console.warn("No user found with the provided credentials");
      return undefined;
    }

    return user;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};
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

export const fetchUserAdminGroupById = async (id: string): Promise<any> => {
  try {
    const userResponse = await axios.get(`http://localhost:3000/users/${id}`);
    const user = userResponse.data;

    const groupsResponse = await axios.get(`http://localhost:3000/groups`);
    const groups = groupsResponse.data;

    const adminGroups = groups.filter((group) =>
      group.groupAdmin.includes(user.id)
    );

    return adminGroups;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const fetchGroupById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/groups/${id}`);
    const group = response.data;

    console.log("Group Data:", group);
    if (!group) {
      throw new Error(`Group not found for ID: ${id}`);
    }

    return group;
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    throw error;
  }
};

export const fetchConnectionById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    const connection = response.data;

    console.log("Fetched Connection Data:", connection);

    if (!connection) {
      throw new Error(`Connection not found for ID: ${id}`);
    }

    return connection;
  } catch (error) {
    console.error("Error fetching connection by ID:", error);
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

export const postGroup = async (groupData): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/groups",
      groupData
    );

    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const fetchGroupEventsById = async (id: string): Promise<any[]> => {
  try {
    const groupResponse = await axios.get(`http://localhost:3000/groups/${id}`);
    const group = groupResponse.data;

    console.log("Group Data:", group);

    if (!group?.events || !Array.isArray(group.events)) {
      throw new Error(`Events not found or invalid for group with ID: ${id}`);
    }

    const eventsResponse = await axios.get("http://localhost:3000/events");
    const events = eventsResponse.data;

    const groupEvents = events.filter((event: any) =>
      group.events.includes(String(event.id))
    );

    return groupEvents;
  } catch (error) {
    console.error("Error fetching group events by ID:", error);
    throw error;
  }
};

export const fetchEventConnections = async (id: string): Promise<any[]> => {
  try {
    const eventResponse = await axios.get(`http://localhost:3000/events/${id}`);
    const event = eventResponse.data;

    if (!event?.attendees) {
      throw new Error(`Attendees not found for event with ID: ${id}`);
    }

    const usersResponse = await axios.get("http://localhost:3000/users");
    const users = usersResponse.data;

    const eventConnections = users.filter((user: any) =>
      event?.attendees.includes(String(user.id))
    );

    return eventConnections;
  } catch (error) {
    console.error("Error fetching event connections:", error);
    throw error;
  }
};
export const fetchGroupMembers = async (id: string): Promise<any[]> => {
  try {
    const groupResponse = await axios.get(`http://localhost:3000/groups/${id}`);
    const group = groupResponse.data;

    console.log("Group Data:", group);

    if (!group?.members || !Array.isArray(group.members)) {
      throw new Error(`Members not found or invalid for group with ID: ${id}`);
    }

    const usersResponse = await axios.get("http://localhost:3000/users");
    const users = usersResponse.data;

    console.log("Fetched Users:", users);

    const groupMembers = users.filter((user: any) =>
      group.members.includes(String(user.id))
    );

    console.log("Filtered Group Members:", groupMembers);
    return groupMembers;
  } catch (error) {
    throw error;
  }
};

export const fetchAllGroups = async (params: {
  category?: string;
  sortBy?: string;
}) => {
  try {
    const groupsResponse = await axios.get("http://localhost:3000/groups");
    let filteredData = groupsResponse.data;

    if (params.category) {
      filteredData = filteredData.filter(
        (group: any) => group.category === params.category
      );
    }
    if (params.sortBy === "popular") {
      filteredData = sortByPopularity(filteredData);
    } else if (params.sortBy === "date") {
      filteredData = sortByDate(filteredData);
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};

export const fetchUserEvents = async (
  id: number,
  params: { category?: string; date?: string; sortBy?: string }
): Promise<any[]> => {
  try {
    const eventsResponse = await axios.get("http://localhost:3000/events");
    let allEvents = eventsResponse.data;

    if (params.category) {
      allEvents = allEvents.filter(
        (event: any) => event.category === params.category
      );
    }

    if (params.date) {
      allEvents = allEvents.filter((event: any) => event.date === params.date);
    }

    if (params.sortBy === "popular") {
      allEvents = sortByPopularity(allEvents);
    } else if (params.sortBy === "date") {
      allEvents = sortByDate(allEvents);
    }

    const userEvents = allEvents.filter((event: any) =>
      event.attendees.includes(String(id))
    );

    return userEvents;
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw error;
  }
};

export const fetchUserGroups = async (
  id: number,
  params: { category?: string; sortBy?: string }
): Promise<any[]> => {
  try {
    const groupsResponse = await axios.get("http://localhost:3000/groups");
    let allGroups = groupsResponse.data;

    if (params.category) {
      allGroups = allGroups.filter(
        (group: any) => group.category === params.category
      );
    }

    if (params.sortBy === "popular") {
      allGroups = sortByPopularity(allGroups);
    } else if (params.sortBy === "date") {
      allGroups = sortByDate(allGroups);
    }

    const userGroups = allGroups.filter((group: any) =>
      group.members.includes(String(id))
    );

    return userGroups;
  } catch (error) {
    console.error("Error fetching user groups:", error);
    throw error;
  }
};

export const fetchUserConnection = async (id: string): Promise<any[]> => {
  try {
    const usersResponse = await axios.get("http://localhost:3000/users");
    const users = usersResponse.data;

    const userConnections = users.filter((user: any) =>
      user.connections.includes(String(id))
    );

    return userConnections;
  } catch (error) {
    console.error("Error fetching user connections:", error);
    throw error;
  }
};

export const fetchSortedEvents = async (sortBy: string): Promise<any[]> => {
  try {
    const eventsResponse = await axios.get("http://localhost:3000/events");
    const events = eventsResponse.data;

    let sortedEvents: any[] = [];

    if (sortBy === "popular") {
      sortedEvents = events.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "date") {
      sortedEvents = events.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortBy === "free") {
      sortedEvents = events.filter((event) => event.price === "Free");
    } else {
      sortedEvents = events;
    }

    return sortedEvents;
  } catch (error) {
    console.error("Error fetching sorted events:", error);
    throw error;
  }
};

export const fetchConnectionEvents = async (id: string): Promise<any[]> => {
  try {
    const connectionResponse = await axios.get(
      `http://localhost:3000/users/${id}`
    );
    const connection = connectionResponse.data;

    const eventsResponse = await axios.get("http://localhost:3000/events");
    const events = eventsResponse.data;
    const connectionEvents = events.filter((event) =>
      connection?.connections.includes(String(event.id))
    );

    return connectionEvents;
  } catch (error) {
    console.error("Error fetching connection events:", error);
    throw error;
  }
};

export const fetchConnectionGroups = async (id: string): Promise<any[]> => {
  try {
    const connectionResponse = await axios.get(
      `http://localhost:3000/users/${id}`
    );
    const connection = connectionResponse.data;

    const groupsResponse = await axios.get("http://localhost:3000/groups");
    const groups = groupsResponse.data;

    const connectionGroups = groups.filter((group) =>
      connection?.groups.includes(String(group.id))
    );

    return connectionGroups;
  } catch (error) {
    console.error("Error fetching connection groups:", error);
    throw error;
  }
};

export const fetchConnectionConnections = async (
  id: number
): Promise<any[]> => {
  try {
    const connectionResponse = await axios.get(
      `http://localhost:3000/users/${id}`
    );
    const connection = connectionResponse.data;

    const usersResponse = await axios.get("http://localhost:3000/users");
    const users = usersResponse.data;

    const connectionConnections = users.filter((user) =>
      connection?.connections.includes(String(user.id))
    );

    return connectionConnections;
  } catch (error) {
    console.error("Error fetching connection connections:", error);
    throw error;
  }
};

export const fetchAllTags = async (): Promise<any[]> => {
  try {
    const categoriesResponse = await axios.get(
      `http://localhost:3000/categories`
    );
    const categories = categoriesResponse.data;

    const tags = categories.map((category) => category.tags).flat();
    const uniqueTags = [...new Set(tags)];
    return uniqueTags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export const fetchAllCategories = async (): Promise<any[]> => {
  try {
    const categoriesResponse = await axios.get(
      `http://localhost:3000/categories`
    );
    const categories = categoriesResponse.data;

    const categotyArray = categories.map((category) => category.category);

    return categotyArray;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
