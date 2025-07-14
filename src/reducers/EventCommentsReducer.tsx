import { Comment } from "../types/comments";

export enum EventCommentsActionTypes {
  CREATE_EVENT_COMMENT = "CREATE_EVENT_COMMENT",
  CREATE_EVENT_COMMENT_SUCCESS = "CREATE_EVENT_COMMENT_SUCCESS",
  CREATE_EVENT_COMMENT_FAILURE = "CREATE_EVENT_COMMENT_FAILURE",
  CREATE_EVENT_COMMENT_REPLY = "CREATE_EVENT_COMMENT_REPLY",
  CREATE_EVENT_COMMENT_REPLY_SUCCESS = "CREATE_EVENT_COMMENT_REPLY_SUCCESS",
  CREATE_EVENT_COMMENT_REPLY_FAILURE = "CREATE_EVENT_COMMENT_REPLY_FAILURE",
  FETCH_EVENT_COMMENTS = "FETCH_EVENT_COMMENTS",
  FETCH_EVENT_COMMENTS_SUCCESS = "FETCH_EVENT_COMMENTS_SUCCESS",
  FETCH_EVENT_COMMENTS_FAILURE = "FETCH_EVENT_COMMENTS_FAILURE",
  FETCH_EVENT_COMMENT_REPLIES = "FETCH_EVENT_COMMENT_REPLIES",
  FETCH_EVENT_COMMENT_REPLIES_SUCCESS = "FETCH_EVENT_COMMENT_REPLIES_SUCCESS",
  FETCH_EVENT_COMMENT_REPLIES_FAILURE = "FETCH_EVENT_COMMENT_REPLIES_FAILURE",
  UPDATE_EVENT_COMMENT = "UPDATE_EVENT_COMMENT",
  UPDATE_EVENT_COMMENT_SUCCESS = "UPDATE_EVENT_COMMENT_SUCCESS",
  UPDATE_EVENT_COMMENT_FAILURE = "UPDATE_EVENT_COMMENT_FAILURE",
  REMOVE_EVENT_COMMENT = "REMOVE_EVENT_COMMENT",
  REMOVE_EVENT_COMMENT_SUCCESS = "REMOVE_EVENT_COMMENT_SUCCESS",
  REMOVE_EVENT_COMMENT_FAILURE = "REMOVE_EVENT_COMMENT_FAILURE",
  CREATE_EVENT_COMMENT_LIKE = "CREATE_EVENT_COMMENT_LIKE",
  CREATE_EVENT_COMMENT_LIKE_SUCCESS = "CREATE_EVENT_COMMENT_LIKE_SUCCESS",
  CREATE_EVENT_COMMENT_LIKE_FAILURE = "CREATE_EVENT_COMMENT_LIKE_FAILURE",
  REMOVE_EVENT_COMMENT_LIKE = "REMOVE_EVENT_COMMENT_LIKE",
  REMOVE_EVENT_COMMENT_LIKE_SUCCESS = "REMOVE_EVENT_COMMENT_LIKE_SUCCESS",
  REMOVE_EVENT_COMMENT_LIKE_FAILURE = "REMOVE_EVENT_COMMENT_LIKE_FAILURE",
}

export interface EventCommentsState {
  eventComments: Comment[];
  eventCommentsReplies: Comment[];
  loading: boolean;
  error: string | null;
}

export const initialEventCommentsState: EventCommentsState = {
  eventComments: [],
  eventCommentsReplies: [],
  loading: false,
  error: null,
};

interface EventCommentsAction {
  type: EventCommentsActionTypes;
  payload?: any;
}

export const EventCommentsReducer = (
  state: EventCommentsState = initialEventCommentsState,
  action: EventCommentsAction
): EventCommentsState => {
  switch (action.type) {
    case EventCommentsActionTypes.CREATE_EVENT_COMMENT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EventCommentsActionTypes.CREATE_EVENT_COMMENT_SUCCESS:
      if (!action.payload.eventComment || !action.payload.eventComment.id) {
        return {
          ...state,
          loading: false,
          error: "Invalid comment data",
        };
      }
      return {
        ...state,
        eventComments: [action.payload.eventComment, ...state.eventComments],
        loading: false,
        error: null,
      };
    case EventCommentsActionTypes.CREATE_EVENT_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EventCommentsActionTypes.CREATE_EVENT_COMMENT_REPLY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EventCommentsActionTypes.CREATE_EVENT_COMMENT_REPLY_SUCCESS:
      if (
        !action.payload.eventCommentReply ||
        !action.payload.eventCommentReply.id
      ) {
        return {
          ...state,
          loading: false,
          error: "Invalid reply data",
        };
      }
      return {
        ...state,
        eventCommentsReplies: [
          action.payload.eventCommentReply,
          ...state.eventCommentsReplies,
        ],
        loading: false,
        error: null,
      };
    case EventCommentsActionTypes.CREATE_EVENT_COMMENT_REPLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EventCommentsActionTypes.FETCH_EVENT_COMMENTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EventCommentsActionTypes.FETCH_EVENT_COMMENTS_SUCCESS:
      return {
        ...state,
        eventComments: action.payload.eventComments || [],
        loading: false,
        error: null,
      };
    case EventCommentsActionTypes.FETCH_EVENT_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EventCommentsActionTypes.FETCH_EVENT_COMMENT_REPLIES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EventCommentsActionTypes.FETCH_EVENT_COMMENT_REPLIES_SUCCESS:
      return {
        ...state,
        eventCommentsReplies: action.payload.eventCommentsReplies || [],
        loading: false,
        error: null,
      };
    case EventCommentsActionTypes.FETCH_EVENT_COMMENT_REPLIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EventCommentsActionTypes.UPDATE_EVENT_COMMENT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EventCommentsActionTypes.UPDATE_EVENT_COMMENT_SUCCESS:
      if (!action.payload.eventComment || !action.payload.eventComment.id) {
        return {
          ...state,
          loading: false,
          error: "Invalid comment data",
        };
      }
      return {
        ...state,
        eventComments: state.eventComments.map((comment) =>
          comment.id === action.payload.eventComment.id
            ? { ...comment, ...action.payload.eventComment }
            : comment
        ),
        eventCommentsReplies: state.eventCommentsReplies.map((reply) =>
          reply.id === action.payload.eventComment.id
            ? { ...reply, ...action.payload.eventComment }
            : reply
        ),
        loading: false,
        error: null,
      };
    case EventCommentsActionTypes.UPDATE_EVENT_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EventCommentsActionTypes.REMOVE_EVENT_COMMENT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EventCommentsActionTypes.REMOVE_EVENT_COMMENT_SUCCESS:
      if (!action.payload.commentId) {
        return {
          ...state,
          loading: false,
          error: "Invalid comment ID",
        };
      }
      return {
        ...state,
        eventComments: state.eventComments.filter(
          (comment) => comment.id !== action.payload.commentId
        ),
        eventCommentsReplies: state.eventCommentsReplies.filter(
          (reply) => reply.id !== action.payload.commentId
        ),
        loading: false,
        error: null,
      };
    case EventCommentsActionTypes.REMOVE_EVENT_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EventCommentsActionTypes.CREATE_EVENT_COMMENT_LIKE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EventCommentsActionTypes.CREATE_EVENT_COMMENT_LIKE_SUCCESS:
      if (!action.payload.commentId || !action.payload.likes) {
        return {
          ...state,
          loading: false,
          error: "Invalid like data",
        };
      }
      return {
        ...state,
        eventComments: state.eventComments.map((comment) =>
          comment.id === action.payload.commentId
            ? { ...comment, likeCount: action.payload.likes }
            : comment
        ),
        eventCommentsReplies: state.eventCommentsReplies.map((reply) =>
          reply.id === action.payload.commentId
            ? { ...reply, likeCount: action.payload.likes }
            : reply
        ),
        loading: false,
        error: null,
      };
    case EventCommentsActionTypes.CREATE_EVENT_COMMENT_LIKE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EventCommentsActionTypes.REMOVE_EVENT_COMMENT_LIKE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EventCommentsActionTypes.REMOVE_EVENT_COMMENT_LIKE_SUCCESS:
      if (!action.payload.commentId || !action.payload.likes) {
        return {
          ...state,
          loading: false,
          error: "Invalid like data",
        };
      }
      return {
        ...state,
        eventComments: state.eventComments.map((comment) =>
          comment.id === action.payload.commentId
            ? { ...comment, likeCount: action.payload.likes }
            : comment
        ),
        eventCommentsReplies: state.eventCommentsReplies.map((reply) =>
          reply.id === action.payload.commentId
            ? { ...reply, likeCount: action.payload.likes }
            : reply
        ),
        loading: false,
        error: null,
      };
    case EventCommentsActionTypes.REMOVE_EVENT_COMMENT_LIKE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
