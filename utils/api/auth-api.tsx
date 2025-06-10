// utils/api/auth-api.js
import axios, { AxiosError } from "axios";

const API = "https://eventwey-backend.onrender.com";

export interface User {
  id: number;
  email: string;
  username?: string;
}

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await axios.post(`${API}/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data as User;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 409) throw new Error("Email already exists");
      throw new Error(data.message || "Failed to sign up");
    }
    console.error("Error signing up:", error);
    throw new Error("Failed to sign up");
  }
};

export const signInUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await axios.post(
      `${API}/auth/signin`,
      { email, password },
      {
        withCredentials: false, 
      }
    );

    const { user, token } = response.data;


    if (token) {
      localStorage.setItem("token", token);
    }

    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 404) throw new Error("User not found");
      if (status === 401) throw new Error("Invalid password");
      throw new Error(data.message || "Failed to sign in");
    }

    console.error("Unexpected sign-in error:", error);
    throw new Error("Failed to sign in");
  }
};

export const signOutUser = async (): Promise<{ message: string }> => {
  try {
    const response = await axios.post(
      `${API}/auth/signout`,
      {},
      {
        withCredentials: true,
      }
    );
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to sign out");
    }
    console.error("Error signing out:", error);
    throw new Error("Failed to sign out");
  }
};

export const fetchUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/auth/me`, {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data as User;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
