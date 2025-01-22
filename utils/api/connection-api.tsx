import axios from "axios";

const API = "https://eventwey.glitch.me";

export const fetchConnectionById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`${API}/users/${id}`);
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

export const fetchConnectionEvents = async (id: string): Promise<any[]> => {
  try {
    const connectionResponse = await axios.get(`${API}/users/${id}`);
    const connection = connectionResponse.data;

    const eventsResponse = await axios.get(`${API}/events`);
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
    const connectionResponse = await axios.get(`${API}/users/${id}`);
    const connection = connectionResponse.data;

    const groupsResponse = await axios.get(`${API}/groups`);
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
    const connectionResponse = await axios.get(`${API}/users/${id}`);
    const connection = connectionResponse.data;

    const usersResponse = await axios.get(`${API}/users/`);
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
