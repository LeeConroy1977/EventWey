// user-api.js
import axios, { AxiosError } from "axios";
import { sortByPopularity, sortByDate } from "../fakeEventSorting";
import { Group } from "../../src/types/group";
import { User } from "../../src/types/user";
import { Event } from "../../src/types/event";

const API = "https://eventwey-backend.onrender.com";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const createUser = async (newUser: Partial<User>): Promise<User> => {
  try {
    const response = await axios.post(`${API}/users`, newUser);
    return response.data as User;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  patchObj: Partial<User>
): Promise<User> => {
  try {
    const response = await axios.patch(`${API}/users/${id}`, patchObj);
    return response.data as User;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API}/users`); // Fixed from PATCH
    return response.data as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUserAdminGroupById = async (id: string): Promise<Group[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/users/${id}/admin-groups`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data as Group[];
  } catch (error) {
    console.error("Error fetching admin groups:", error);
    throw error;
  }
};

export const fetchUserEvents = async (
  id: string,
  params: { category?: string; date?: string; sortBy?: string }
): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/users/${id}/events`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    let userEvents = response.data;
    if (params.category) {
      userEvents = userEvents.filter(
        (event: any) => event.category === params.category
      );
    }
    if (params.date) {
      userEvents = userEvents.filter(
        (event: any) => event.date === params.date
      );
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

export const postJoinEvent = async (
  eventId: string,
  ticketType?: string,
  body?: {}
): Promise<Event> => {
  const token = localStorage.getItem("token");

  try {
    const url = ticketType
      ? `${API}/events/${eventId}/join?ticketType=${encodeURIComponent(
          ticketType
        )}`
      : `${API}/events/${eventId}/join`;

    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as Event;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        throw new Error("Unauthorized. Please log in.");
      }
      throw new Error(data.message || "Failed to join event");
    }
    console.error("Error joining event:", error);
    throw error;
  }
};

export const postLeaveEvent = async (
  eventId: string,
  ticketType?: string
): Promise<Event> => {
  const token = localStorage.getItem("token");

  try {
    const url = ticketType
      ? `${API}/events/${eventId}/leave?ticketType=${encodeURIComponent(
          ticketType
        )}`
      : `${API}/events/${eventId}/leave`;

    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as Event;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        throw new Error("Unauthorized. Please log in.");
      }
      throw new Error(data.message || "Failed to leave event");
    }
    console.error("Error leaving event:", error);
    throw error;
  }
};

export const postBackFillTickets = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  try {
    const response = await axios.post(
      `${API}/events/backfill-payment-intents`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error backfilling events tickets:", error);
    throw error;
  }
};

export const postJoinGroup = async (groupId: string): Promise<Group> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${API}/groups/${groupId}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as Group;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        throw new Error("Unauthorized. Please log in.");
      }
      throw new Error(data.message || "Failed to join group");
    }
    console.error("Error joining group:", error);
    throw error;
  }
};

export const postLeaveGroup = async (groupId: string): Promise<Group> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API}/groups/${groupId}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        throw new Error("Unauthorized. Please log in.");
      }
      throw new Error(data.message || "Failed to leave group");
    }
    console.error("Error leaving group:", error);
    throw error;
  }
};

export const fetchUserGroups = async (
  id: string,
  params: { category?: string; sortBy?: string }
): Promise<Group[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/users/${id}/groups`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    let userGroups = response.data;
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

export const fetchUserConnection = async (id: string): Promise<User[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/users/${id}/connections`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data as User[];
  } catch (error) {
    console.error("Error fetching user connections:", error);
    throw error;
  }
};

export const fetchUserNotifications = async (id: string): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/notifications/${id}`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    throw error;
  }
};

export const postMakeConnectionRequest = async (
  userId: string,
  recipientId: string
): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API}/connections/${userId}/request/${recipientId}`,
      {},
      {
        withCredentials: true,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error requesting connection request:", error);
    throw error;
  }
};

export const fetchConnectionRequests = async (id: string): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/connections/${id}/requests`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching connection requests:", error);
    throw error;
  }
};

export const postAcceptConnectionRequest = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API}/connections/accept/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error accepting connection request:", error);
    throw error;
  }
};

export const postRejectConnectionRequest = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API}/connections/reject/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting connection request:", error);
    throw error;
  }
};
