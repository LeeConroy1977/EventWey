import axios from "axios";
import { Comment } from "../../src/types/comments";
const API = "https://eventwey-backend.onrender.com";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const postEventComment = async (
  eventId: number,
  content: string
): Promise<Comment> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API}/comments`,
      { eventId, content },
      {
        withCredentials: true,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.data as Comment;
  } catch (error) {
    console.error("Error creating event comment:", error);
    throw error;
  }
};

export const postEventCommentReply = async (
  commentId: number,
  content: string
): Promise<Comment> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API}/comments/${commentId}/reply`,
      { content },
      {
        withCredentials: true,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.data as Comment;
  } catch (error) {
    console.error("Error creating comment reply:", error);
    throw error;
  }
};

export const getEventComments = async (
  eventId: number,
  page: number = 1,
  limit: number = 4
): Promise<Comment[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/comments/event/${eventId}`, {
      params: { page, limit },
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data as Comment[];
  } catch (error) {
    console.error("Error fetching event comments:", error);
    throw error;
  }
};

export const getEventCommentsReplies = async (
  commentId: number
): Promise<Comment[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/comments/${commentId}/replies`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data as Comment[];
  } catch (error) {
    console.error("Error fetching event comments replies:", error);
    throw error;
  }
};

export const patchEventComment = async (
  commentId: number,
  content: string
): Promise<Comment> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${API}/comments/${commentId}`,
      { content },
      {
        withCredentials: true,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.data as Comment;
  } catch (error) {
    console.error("Error patching event comment:", error);
    throw error;
  }
};

export const deleteEventComment = async (commentId: number): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API}/comments/${commentId}`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting event comment:", error);
    throw error;
  }
};

export const postCommentLike = async (commentId: number): Promise<Comment> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API}/comments/${commentId}/like`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting comment like:", error);
    throw error;
  }
};

export const deleteCommentLike = async (commentId: number): Promise<Comment> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API}/comments/${commentId}/like`, {
      withCredentials: true,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting comment like:", error);
    throw error;
  }
};
