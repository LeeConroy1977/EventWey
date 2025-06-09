import axios from "axios";

const API = 'https://eventwey-backend.onrender.com';

export const fetchConnectionById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`${API}/users/${id}`);
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
    const response = await axios.get(`${API}/users/${id}`);
    const user = response.data;


    if (!user) {
      throw new Error(`user not found for ID: ${id}`);
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const fetchConnectionEvents = async (id: string): Promise<any[]> => {
  try {
    const connectionResponse = await axios.get(`${API}/users/${id}/events`);
    const connectionEvents = connectionResponse.data;

  

    return connectionEvents;
  } catch (error) {
    console.error("Error fetching connection events:", error);
    throw error;
  }
};

export const fetchConnectionGroups = async (id: string): Promise<any[]> => {
  try {
    const connectionResponse = await axios.get(`${API}/users/${id}/groups`);
    const connectionGroups = connectionResponse.data;

   

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
    const connectionResponse = await axios.get(`${API}/users/${id}connections`);
    const connectionConnections = connectionResponse.data;


    return connectionConnections;
  } catch (error) {
    console.error("Error fetching connection connections:", error);
    throw error;
  }
};
