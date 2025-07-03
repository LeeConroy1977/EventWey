import axios from "axios";

const API = "https://eventwey-backend.onrender.com";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const fetchConnectionById = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/users/${id}`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const connection = response.data;

    if (!connection) {
      throw new Error(`Connection not found for ID: ${id}`);
    }

    return connection;
  } catch (error) {
    console.error("Error fetching connection by ID:", error);
    throw error;
  }
};

export const fetchUserById = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/users/${id}`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const user = response.data;

    if (!user) {
      throw new Error(`User not found for ID: ${id}`);
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const fetchConnectionEvents = async (id: string): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/users/${id}/events`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const connectionEvents = response.data;

    return connectionEvents;
  } catch (error) {
    console.error("Error fetching connection events:", error);
    throw error;
  }
};

export const fetchConnectionGroups = async (id: string): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/users/${id}/groups`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const connectionGroups = response.data;

    return connectionGroups;
  } catch (error) {
    console.error("Error fetching connection groups:", error);
    throw error;
  }
};

export const fetchConnectionConnections = async (
  id: string
): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/users/${id}/connections`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const connectionConnections = response.data;

    return connectionConnections;
  } catch (error) {
    console.error("Error fetching connection connections:", error);
    throw error;
  }
};
