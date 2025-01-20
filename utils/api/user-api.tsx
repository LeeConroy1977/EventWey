import axios from "axios";
import { sortByPopularity, sortByDate } from "../fakeEventSorting";

const API = "https://eventwey.glitch.me";

export const createUser = async (newUser: any): Promise<any> => {
  try {
    const response = await axios.post(`${API}/users`, newUser);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id: string, patchObj: any): Promise<any> => {
  try {
    const { data: user } = await axios.get(`${API}/users/${id}`);
    const patchedUser = { ...user, ...patchObj };

    const { data: updatedUser } = await axios.patch(
      `${API}/users/${id}`,
      patchedUser
    );

    console.log("Updated User Data:", updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const fetchAllUsers = async (): Promise<any[]> => {
  try {
    const response = await axios.get("https://eventwey.glitch.me/users");
    console.log(response.data, "all users");
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
    const response = await fetchAllUsers();
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

export const fetchUserAdminGroupById = async (id: string): Promise<any> => {
  try {
    const userResponse = await axios.get(`${API}/users/${id}`);
    const user = userResponse.data;

    const groupsResponse = await axios.get(`${API}/groups`);
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

export const fetchUserEvents = async (
  id: number,
  params: { category?: string; date?: string; sortBy?: string }
): Promise<any[]> => {
  try {
    const eventsResponse = await axios.get(`${API}/events`);
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
    const groupsResponse = await axios.get(`${API}/groups`);
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
    const usersResponse = await axios.get(`${API}/users`);
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
