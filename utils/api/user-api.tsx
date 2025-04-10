import axios from "axios";
import { sortByPopularity, sortByDate } from "../fakeEventSorting";

const API = "https://eventwey-backend.onrender.com"

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
    const { data: updatedUser } = await axios.patch(
      `${API}/users/${id}`,
      patchObj
    );
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const fetchAllUsers = async (): Promise<any[]> => {
  try {
    const response = await axios.patch(
      `${API}/users`);
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
    const adminGroupsResponse = await axios.get(`${API}/users/${id}/admin-groups`);
    const adminGroups = adminGroupsResponse.data;

  

    return adminGroups;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const fetchUserEvents = async (
  id: string,
  params: { category?: string; date?: string; sortBy?: string }
): Promise<any[]> => {
  try {
    const eventsResponse = await axios.get(`${API}/users/${id}/events`);
    let userEvents = eventsResponse.data;

    if (params.category) {
      userEvents = userEvents.filter(
        (event: any) => event.category === params.category
      );
    }

    if (params.date) {
      userEvents = userEvents.filter((event: any) => event.date === params.date);
    }

    if (params.sortBy === "popular") {
      userEvents = sortByPopularity(userEvents);
    } else if (params.sortBy === "date") {
      userEvents = sortByDate(userEvents);
    }

   

    return userEvents;
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw error;
  }
};

export const fetchUserGroups = async (
  id: string,
  params: { category?: string; sortBy?: string }
): Promise<any[]> => {
  try {
    const groupsResponse = await axios.get(`${API}/users/${id}/groups`);
    let userGroups = groupsResponse.data;

    if (params.category) {
      userGroups = userGroups.filter(
        (group: any) => group.category === params.category
      );
    }

    if (params.sortBy === "popular") {
      userGroups = sortByPopularity(userGroups);
    } else if (params.sortBy === "date") {
      userGroups = sortByDate(userGroups);
    }

    

    return userGroups;
  } catch (error) {
    console.error("Error fetching user groups:", error);
    throw error;
  }
};

export const fetchUserConnection = async (id: string): Promise<any[]> => {
  try {
    const usersResponse = await axios.get(`${API}/users/${id}/connections`);
    const userConnections = usersResponse.data;

   

    return userConnections;
  } catch (error) {
    console.error("Error fetching user connections:", error);
    throw error;
  }
};
