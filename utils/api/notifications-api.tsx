import axios from "axios";

const API = "https://eventwey-backend.onrender.com";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

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

export const updateNotification = async (id: string): Promise<any> => {
  try {
    const response = await axios.patch(`${API}/notifications/mark-read/${id}`);
    const notification = response.data;
  } catch (error) {
    console.error("Error fetching notification by ID:", error);
    throw error;
  }
};
