import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { Comment } from "../types/comments";
import { useUser } from "./UserContext";
import {
  EventCommentsActionTypes,
  EventCommentsReducer,
  initialEventCommentsState,
} from "../reducers/EventCommentsReducer";
import {
  deleteCommentLike,
  deleteEventComment,
  getEventComments,
  getEventCommentsReplies,
  patchEventComment,
  postCommentLike,
  postEventComment,
} from "../../utils/api/event-comments-api";

interface EventCommentsContextType {
  eventCommentsState: {
    eventComments: Comment[];
    eventCommentsReplies: Comment[];
    loading: boolean;
    error: string | null;
  };
  createEventComment: (eventId: number, content: string) => Promise<void>;
  createEventCommentReply: (
    commentId: number,
    content: string
  ) => Promise<void>;
  fetchEventComments: (
    eventId: number,
    page?: number,
    limit?: number
  ) => Promise<void>;
  fetchEventCommentsReplies: (commentId: number) => Promise<void>;
  updateEventComment: (commentId: number, content: string) => Promise<void>;
  removeEventComment: (commentId: number) => Promise<void>;
  createEventCommentLike: (commentId: number) => Promise<void>;
  removeEventCommentLike: (commentId: number) => Promise<void>;
}

interface EventCommentsProviderProps {
  children: ReactNode;
}

const EventCommentsContext = createContext<EventCommentsContextType | null>(
  null
);

export const EventCommentsProvider: React.FC<EventCommentsProviderProps> = ({
  children,
}) => {
  const { user } = useUser();
  const [eventCommentsState, dispatch] = useReducer(
    EventCommentsReducer,
    initialEventCommentsState
  );

  const createEventComment = async (eventId: number, content: string) => {
    if (!user?.id) {
      dispatch({
        type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_FAILURE,
        payload: "User not authenticated",
      });
      return;
    }
    dispatch({ type: EventCommentsActionTypes.CREATE_EVENT_COMMENT });
    try {
      const comment = await postEventComment(eventId, content);
      dispatch({
        type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_SUCCESS,
        payload: { eventComment: comment },
      });
    } catch (error) {
      dispatch({
        type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_FAILURE,
        payload: error.response?.data?.message || "Failed to create comment",
      });
    }
  };

  const createEventCommentReply = async (
    commentId: number,
    content: string
  ) => {
    if (!user?.id) {
      dispatch({
        type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_REPLY_FAILURE,
        payload: "User not authenticated",
      });
      return;
    }
    dispatch({ type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_REPLY });
    try {
      const commentReply = await postEventComment(commentId, content);
      dispatch({
        type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_REPLY_SUCCESS,
        payload: { eventCommentReply: commentReply },
      });
    } catch (error) {
      dispatch({
        type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_REPLY_FAILURE,
        payload: error.response?.data?.message || "Failed to create reply",
      });
    }
  };

  const fetchEventComments = async (
    eventId: number,
    page: number = 1,
    limit: number = 4
  ) => {
    dispatch({ type: EventCommentsActionTypes.FETCH_EVENT_COMMENTS });
    try {
      const eventComments = await getEventComments(eventId, page, limit);
      dispatch({
        type: EventCommentsActionTypes.FETCH_EVENT_COMMENTS_SUCCESS,
        payload: { eventComments: eventComments },
      });
    } catch (error) {
      dispatch({
        type: EventCommentsActionTypes.FETCH_EVENT_COMMENTS_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch comments",
      });
    }
  };

  const fetchEventCommentsReplies = async (commentId: number) => {
    dispatch({ type: EventCommentsActionTypes.FETCH_EVENT_COMMENT_REPLIES });
    try {
      const eventCommentReplies = await getEventCommentsReplies(commentId);
      dispatch({
        type: EventCommentsActionTypes.FETCH_EVENT_COMMENT_REPLIES_SUCCESS,
        payload: { eventCommentsReplies: eventCommentReplies },
      });
    } catch (error) {
      dispatch({
        type: EventCommentsActionTypes.FETCH_EVENT_COMMENT_REPLIES_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch replies",
      });
    }
  };

  const updateEventComment = async (commentId: number, content: string) => {
    if (!user?.id) {
      dispatch({
        type: EventCommentsActionTypes.UPDATE_EVENT_COMMENT_FAILURE,
        payload: "User not authenticated",
      });
      return;
    }
    dispatch({ type: EventCommentsActionTypes.UPDATE_EVENT_COMMENT });
    try {
      const comment = await patchEventComment(commentId, content);
      dispatch({
        type: EventCommentsActionTypes.UPDATE_EVENT_COMMENT_SUCCESS,
        payload: { eventComment: comment },
      });
    } catch (error) {
      dispatch({
        type: EventCommentsActionTypes.UPDATE_EVENT_COMMENT_FAILURE,
        payload: error.response?.data?.message || "Failed to update comment",
      });
    }
  };

  const removeEventComment = async (commentId: number) => {
    if (!user?.id) {
      dispatch({
        type: EventCommentsActionTypes.REMOVE_EVENT_COMMENT_FAILURE,
        payload: "User not authenticated",
      });
      return;
    }
    dispatch({ type: EventCommentsActionTypes.REMOVE_EVENT_COMMENT });
    try {
      await deleteEventComment(commentId);
      dispatch({
        type: EventCommentsActionTypes.REMOVE_EVENT_COMMENT_SUCCESS,
        payload: { commentId },
      });
    } catch (error) {
      dispatch({
        type: EventCommentsActionTypes.REMOVE_EVENT_COMMENT_FAILURE,
        payload: error.response?.data?.message || "Failed to remove comment",
      });
    }
  };

  const createEventCommentLike = async (commentId: number) => {
    if (!user?.id) {
      dispatch({
        type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_LIKE_FAILURE,
        payload: "User not authenticated",
      });
      return;
    }
    dispatch({ type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_LIKE });
    try {
      const comment = await postCommentLike(commentId)
      dispatch({
        type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_LIKE_SUCCESS,
        payload: { commentId, likes: comment.likes },
      });
    } catch (error) {
      dispatch({
        type: EventCommentsActionTypes.CREATE_EVENT_COMMENT_LIKE_FAILURE,
        payload: error.response?.data?.message || "Failed to like comment",
      });
    }
  };

  const removeEventCommentLike = async (commentId: number) => {
    if (!user?.id) {
      dispatch({
        type: EventCommentsActionTypes.REMOVE_EVENT_COMMENT_LIKE_FAILURE,
        payload: "User not authenticated",
      });
      return;
    }
    dispatch({ type: EventCommentsActionTypes.REMOVE_EVENT_COMMENT_LIKE });
    try {
      const comment = await deleteCommentLike(commentId)
      dispatch({
        type: EventCommentsActionTypes.REMOVE_EVENT_COMMENT_LIKE_SUCCESS,
        payload: { commentId, likes: comment.likes },
      });
    } catch (error) {
      dispatch({
        type: EventCommentsActionTypes.REMOVE_EVENT_COMMENT_LIKE_FAILURE,
        payload: error.response?.data?.message || "Failed to unlike comment",
      });
    }
  };

  return (
    <EventCommentsContext.Provider
      value={{
        eventCommentsState,
        createEventComment,
        createEventCommentReply,
        fetchEventComments,
        fetchEventCommentsReplies,
        updateEventComment,
        removeEventComment,
        createEventCommentLike,
        removeEventCommentLike,
      }}>
      {children}
    </EventCommentsContext.Provider>
  );
};

export const useEventComments = (): EventCommentsContextType => {
  const context = useContext(EventCommentsContext);
  if (!context) {
    throw new Error(
      "useEventComments must be used within an EventCommentsProvider"
    );
  }
  return context;
};
