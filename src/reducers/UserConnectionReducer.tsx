import { User } from "../types/user";
import { Connection } from "../types/connection";

export enum UserConnectionActionTypes {
  CREATE_CONNECTION_REQUEST = "CREATE_CONNECTION_REQUEST",
  CREATE_CONNECTION_SUCCESS = "CREATE_CONNECTION_SUCCESS",
  CREATE_CONNECTION_REVERT = "CREATE_CONNECTION_REVERT",
  CREATE_CONNECTION_FAILURE = "CREATE_CONNECTION_FAILURE",
  FETCH_CONNECTION_REQUESTS = "FETCH_CONNECTION_REQUESTS",
  FETCH_CONNECTION_REQUESTS_SUCCESS = "FETCH_CONNECTION_REQUESTS_SUCCESS",
  FETCH_CONNECTION_REQUESTS_FAILURE = "FETCH_CONNECTION_REQUESTS_FAILURE",
  FETCH_SENT_REQUESTS = "FETCH_SENT_REQUESTS",
  FETCH_SENT_REQUESTS_SUCCESS = "FETCH_SENT_REQUESTS_SUCCESS",
  FETCH_SENT_REQUESTS_FAILURE = "FETCH_SENT_REQUESTS_FAILURE",
  ACCEPT_CONNECTION_REQUEST = "ACCEPT_CONNECTION_REQUEST",
  ACCEPT_CONNECTION_SUCCESS = "ACCEPT_CONNECTION_SUCCESS",
  ACCEPT_CONNECTION_REVERT = "ACCEPT_CONNECTION_REVERT",
  ACCEPT_CONNECTION_FAILURE = "ACCEPT_CONNECTION_FAILURE",
  REJECT_CONNECTION_REQUEST = "REJECT_CONNECTION_REQUEST",
  REJECT_CONNECTION_SUCCESS = "REJECT_CONNECTION_SUCCESS",
  REJECT_CONNECTION_REVERT = "REJECT_CONNECTION_REVERT",
  REJECT_CONNECTION_FAILURE = "REJECT_CONNECTION_FAILURE",
  DELETE_CONNECTION = "DELETE_CONNECTION",
  DELETE_CONNECTION_SUCCESS = "DELETE_CONNECTION_SUCCESS",
  DELETE_CONNECTION_FAILURE = "DELETE_CONNECTION_FAILURE",
  DELETE_CONNECTION_REQUEST = "DELETE_CONNECTION_REQUEST",
  DELETE_CONNECTION_REQUEST_SUCCESS = "DELETE_CONNECTION_REQUEST_SUCCESS",
  DELETE_CONNECTION_REQUEST_REVERT = "DELETE_CONNECTION_REQUEST_REVERT",
  DELETE_CONNECTION_REQUEST_FAILURE = "DELETE_CONNECTION_REQUEST_FAILURE",
  SET_CONNECTIONS = "SET_CONNECTIONS",
  FILTER_CONNECTIONS = "FILTER_CONNECTIONS",
}

export interface UserConnectionState {
  userConnectionRequests: {
    id: number;
    requester: number;
    recipient: number;
    status: "pending" | "accepted" | "rejected";
  }[];
  userSentRequests: {
    id: number;
    requester: number;
    recipient: number;
    status: "pending" | "accepted" | "rejected";
  }[];
  userConnectionRequestsObjects: User[];
  userSentRequestsObjects: User[];
  connections: User[];
  filteredConnections: Connection[];
  loading: boolean;
  error: string | null;
  isNewConnection: boolean;
}

export const initialUserConnectionState: UserConnectionState = {
  userConnectionRequests: [],
  userSentRequests: [],
  userConnectionRequestsObjects: [],
  userSentRequestsObjects: [],
  connections: [],
  filteredConnections: [],
  loading: false,
  error: null,
  isNewConnection: false,
};

interface UserConnectionAction {
  type: UserConnectionActionTypes;
  payload?: any;
}

export const UserConnectionReducer = (
  state: UserConnectionState,
  action: UserConnectionAction
): UserConnectionState => {
  switch (action.type) {
    case UserConnectionActionTypes.CREATE_CONNECTION_REQUEST:
      return {
        ...state,
        userSentRequests: [
          ...state.userSentRequests,
          {
            id: -1,
            requester: action.payload.userId,
            recipient: action.payload.recipientId,
            status: "pending",
          },
        ],
        userSentRequestsObjects: [
          ...state.userSentRequestsObjects,
          action.payload.user,
        ],
        error: null,
      };
    case UserConnectionActionTypes.CREATE_CONNECTION_SUCCESS:
      return {
        ...state,
        userSentRequests: state.userSentRequests.map((request) =>
          request.id === -1 &&
          request.requester === action.payload.requester &&
          request.recipient === action.payload.recipient
            ? { ...request, id: action.payload.id, status: "pending" }
            : request
        ),
        error: null,
      };
    case UserConnectionActionTypes.CREATE_CONNECTION_REVERT:
      return {
        ...state,
        userSentRequests: state.userSentRequests.filter(
          (request) =>
            !(
              request.id === -1 &&
              request.recipient === action.payload.recipientId
            )
        ),
        userSentRequestsObjects: state.userSentRequestsObjects.filter(
          (user) => user.id !== action.payload.recipientId
        ),
        error: action.payload.error,
      };
    case UserConnectionActionTypes.CREATE_CONNECTION_FAILURE:
      return { ...state, error: action.payload };
    case UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS:
      return { ...state, loading: true, error: null };
    case UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS_SUCCESS:
      return {
        ...state,
        userConnectionRequests: action.payload.requests,
        userConnectionRequestsObjects: action.payload.users,
        loading: false,
        error: null,
      };
    case UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UserConnectionActionTypes.FETCH_SENT_REQUESTS:
      return { ...state, loading: true, error: null };
    case UserConnectionActionTypes.FETCH_SENT_REQUESTS_SUCCESS:
      return {
        ...state,
        userSentRequests: action.payload.requests,
        userSentRequestsObjects: action.payload.users,
        loading: false,
        error: null,
      };
    case UserConnectionActionTypes.FETCH_SENT_REQUESTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UserConnectionActionTypes.ACCEPT_CONNECTION_REQUEST:
      return {
        ...state,
        userConnectionRequests: state.userConnectionRequests.filter(
          (req) => req.requester !== action.payload.requesterId
        ),
        userConnectionRequestsObjects:
          state.userConnectionRequestsObjects.filter(
            (user) => user.id !== action.payload.requesterId
          ),
        connections: [...state.connections, action.payload.user],
        error: null,
      };
    case UserConnectionActionTypes.ACCEPT_CONNECTION_SUCCESS:
      return { ...state, error: null };
    case UserConnectionActionTypes.ACCEPT_CONNECTION_REVERT:
      return {
        ...state,
        userConnectionRequests: [
          ...state.userConnectionRequests,
          action.payload.request,
        ],
        userConnectionRequestsObjects: [
          ...state.userConnectionRequestsObjects,
          { id: action.payload.requesterId, username: "Unknown" },
        ],
        connections: state.connections.filter(
          (conn) => conn.id !== action.payload.requesterId
        ),
        error: action.payload.error,
      };
    case UserConnectionActionTypes.ACCEPT_CONNECTION_FAILURE:
      return { ...state, error: action.payload };
    case UserConnectionActionTypes.REJECT_CONNECTION_REQUEST:
      return {
        ...state,
        userConnectionRequests: state.userConnectionRequests.filter(
          (req) => req.requester !== action.payload.requesterId
        ),
        userConnectionRequestsObjects:
          state.userConnectionRequestsObjects.filter(
            (user) => user.id !== action.payload.requesterId
          ),
        error: null,
      };
    case UserConnectionActionTypes.REJECT_CONNECTION_SUCCESS:
      return { ...state, error: null };
    case UserConnectionActionTypes.REJECT_CONNECTION_REVERT:
      return {
        ...state,
        userConnectionRequests: [
          ...state.userConnectionRequests,
          action.payload.request,
        ],
        userConnectionRequestsObjects: [
          ...state.userConnectionRequestsObjects,
          { id: action.payload.request.requester, username: "Unknown" },
        ],
        error: action.payload.error,
      };
    case UserConnectionActionTypes.REJECT_CONNECTION_FAILURE:
      return { ...state, error: action.payload };
    case UserConnectionActionTypes.DELETE_CONNECTION:
      return {
        ...state,
        connections: state.connections.filter(
          (conn) => conn.id !== action.payload.recipientId
        ),
        error: null,
      };
    case UserConnectionActionTypes.DELETE_CONNECTION_SUCCESS:
      return { ...state, error: null };
    case UserConnectionActionTypes.DELETE_CONNECTION_REQUEST:
      return {
        ...state,
        userSentRequests: state.userSentRequests.filter(
          (req) => req.recipient !== action.payload.recipientId
        ),
        userSentRequestsObjects: state.userSentRequestsObjects.filter(
          (user) => user.id !== action.payload.recipientId
        ),
        error: null,
      };
    case UserConnectionActionTypes.DELETE_CONNECTION_REQUEST_SUCCESS:
      return { ...state, error: null };
    case UserConnectionActionTypes.DELETE_CONNECTION_REQUEST_REVERT:
      return {
        ...state,
        userSentRequests: [...state.userSentRequests, action.payload.request],
        userSentRequestsObjects: [
          ...state.userSentRequestsObjects,
          action.payload.user,
        ],
        error: action.payload.error,
      };
    case UserConnectionActionTypes.DELETE_CONNECTION_REQUEST_FAILURE:
      return { ...state, error: action.payload };
    case UserConnectionActionTypes.SET_CONNECTIONS:
      return {
        ...state,
        connections: action.payload,
        filteredConnections: action.payload,
        loading: false,
        error: null,
      };
    case UserConnectionActionTypes.FILTER_CONNECTIONS:
      return { ...state, filteredConnections: action.payload };
    default:
      return state;
  }
};
