import { createContext, useContext, useReducer, ReactNode } from "react";
import {
  fetchAllUsers,
  fetchConnectionRequests,
  fetchSentConnectionRequests,
  postMakeConnectionRequest,
  postAcceptConnectionRequest,
  postRejectConnectionRequest,
  removeConnection,
  fetchUserConnection,
  cancelConnectionRequest,
} from "../../utils/api/user-api";
import { User } from "../types/user";
import { Connection } from "../types/connection";
import {
  initialUserConnectionState,
  UserConnectionReducer,
  UserConnectionActionTypes,
} from "../reducers/UserConnectionReducer";

interface UserConnectionContextType {
  userConnectionState: {
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
  };
  createConnectionRequest: (
    recipientId: number,
    userId: number
  ) => Promise<void>;
  getConnectionRequest: (id: number) => Promise<void>;
  getSentConnectionRequest: (id: number) => Promise<void>;
  acceptConnectionRequest: (
    requesterId: number,
    userId: number
  ) => Promise<void>;
  rejectConnectionRequest: (
    requesterId: number,
    userId: number
  ) => Promise<void>;
  deleteConnection: (recipientId: number, userId: number) => Promise<void>;
  removeConnectionRequest: (
    senderId: number,
    recipientId: number
  ) => Promise<void>;
  handleConnectionStatus: (recipientId: number, userId: number) => string;
  getAllConnections: (userId: number) => Promise<void>;
  handleConnectionQuery: (value: string) => void;
}

const UserConnectionContext = createContext<UserConnectionContextType | null>(
  null
);

interface UserConnectionProviderProps {
  children: ReactNode;
}

export const UserConnectionProvider: React.FC<UserConnectionProviderProps> = ({
  children,
}) => {
  const [userConnectionState, dispatch] = useReducer(
    UserConnectionReducer,
    initialUserConnectionState
  );

  const createConnectionRequest = async (
    recipientId: number,
    userId: number
  ) => {
    if (!userId) {
      dispatch({
        type: UserConnectionActionTypes.CREATE_CONNECTION_FAILURE,
        payload: "User is not logged in or has no valid ID.",
      });
      return;
    }
    if (userId === recipientId) {
      dispatch({
        type: UserConnectionActionTypes.CREATE_CONNECTION_FAILURE,
        payload: "You can't connect with yourself.",
      });
      return;
    }

    try {
      const users = await fetchAllUsers();
      const recipientUser = users.find((u) => u.id === recipientId);
      if (!recipientUser) {
        dispatch({
          type: UserConnectionActionTypes.CREATE_CONNECTION_FAILURE,
          payload: "Recipient user not found.",
        });
        return;
      }

      dispatch({
        type: UserConnectionActionTypes.CREATE_CONNECTION_REQUEST,
        payload: { userId, recipientId, user: recipientUser },
      });

      const result = await postMakeConnectionRequest(
        String(userId),
        String(recipientId)
      );
      dispatch({
        type: UserConnectionActionTypes.CREATE_CONNECTION_SUCCESS,
        payload: result,
      });
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Failed to send connection request.";
      console.error("Connection request failed:", {
        message: errorMessage,
        status: err?.response?.status,
        recipientId,
        userId,
      });
      try {
        await getSentConnectionRequest(userId);
      } catch (refreshErr) {
        console.error("Failed to refresh sent requests:", refreshErr);
      }
      if (err?.response?.status === 400 && errorMessage.includes("already")) {
        dispatch({
          type: UserConnectionActionTypes.CREATE_CONNECTION_REVERT,
          payload: { error: errorMessage, recipientId },
        });
      } else {
        dispatch({
          type: UserConnectionActionTypes.CREATE_CONNECTION_FAILURE,
          payload: errorMessage,
        });
      }
    }
  };

  const getConnectionRequest = async (id: number) => {
    if (!id) {
      dispatch({
        type: UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS_FAILURE,
        payload: "User is not logged in or doesn't have a valid ID.",
      });
      return;
    }
    dispatch({ type: UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS });
    try {
      const users = await fetchAllUsers();
      const requests = await fetchConnectionRequests(String(id));
      const userConnectionRequestObjects = requests
        .map((request) => {
          if (!request?.requester) return null;
          return users.find((userObj) => userObj.id === request.requester);
        })
        .filter((userObj): userObj is User => !!userObj);

      dispatch({
        type: UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS_SUCCESS,
        payload: { requests, users: userConnectionRequestObjects },
      });
    } catch (err) {
      console.error("Error fetching connection requests:", err);
      dispatch({
        type: UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS_FAILURE,
        payload: "Failed to fetch connection requests.",
      });
    }
  };

  const getSentConnectionRequest = async (id: number) => {
    if (!id) {
      dispatch({
        type: UserConnectionActionTypes.FETCH_SENT_REQUESTS_FAILURE,
        payload: "User is not logged in or doesn't have a valid ID.",
      });
      return;
    }
    dispatch({ type: UserConnectionActionTypes.FETCH_SENT_REQUESTS });
    try {
      const users = await fetchAllUsers();
      const sentRequests = await fetchSentConnectionRequests(String(id));
      const userSentRequestObjects = sentRequests
        .map((request) => {
          if (!request?.recipient) return null;
          return users.find((userObj) => userObj.id === request.recipient);
        })
        .filter((userObj): userObj is User => !!userObj);

      dispatch({
        type: UserConnectionActionTypes.FETCH_SENT_REQUESTS_SUCCESS,
        payload: { requests: sentRequests, users: userSentRequestObjects },
      });
    } catch (err) {
      console.error("Error fetching sent requests:", err);
      dispatch({
        type: UserConnectionActionTypes.FETCH_SENT_REQUESTS_FAILURE,
        payload: "Failed to fetch sent requests.",
      });
    }
  };

  const acceptConnectionRequest = async (
    requesterId: number,
    userId: number
  ) => {
    if (!userId) {
      dispatch({
        type: UserConnectionActionTypes.ACCEPT_CONNECTION_FAILURE,
        payload: "User is not logged in or doesn't have a valid ID.",
      });
      return;
    }

    try {
      console.log("this ran");
      const userRequests = await fetchConnectionRequests(String(userId));
      const request = userRequests.find((req) => req.requester === requesterId);
      if (!request) {
        dispatch({
          type: UserConnectionActionTypes.ACCEPT_CONNECTION_FAILURE,
          payload: "Request does not exist.",
        });
        return;
      }
      const user = (await fetchAllUsers()).find((u) => u.id === requesterId);
      if (!user) {
        dispatch({
          type: UserConnectionActionTypes.ACCEPT_CONNECTION_FAILURE,
          payload: "User not found.",
        });
        return;
      }

      dispatch({
        type: UserConnectionActionTypes.ACCEPT_CONNECTION_REQUEST,
        payload: { requesterId, user },
      });

      await postAcceptConnectionRequest(String(request.id));
      dispatch({
        type: UserConnectionActionTypes.ACCEPT_CONNECTION_SUCCESS,
        payload: { requestId: request.id, connection: user },
      });
    } catch (err: any) {
      console.error("Error accepting request:", err);
      dispatch({
        type: UserConnectionActionTypes.ACCEPT_CONNECTION_REVERT,
        payload: {
          error: err?.response?.data?.message || "Failed to accept request.",
          requesterId,
          request: {
            id: -1,
            requester: requesterId,
            recipient: userId,
            status: "pending",
          },
        },
      });
    }
  };

  const rejectConnectionRequest = async (
    requesterId: number,
    userId: number
  ) => {
    if (!userId) {
      dispatch({
        type: UserConnectionActionTypes.REJECT_CONNECTION_FAILURE,
        payload: "User is not logged in or doesn't have a valid ID.",
      });
      return;
    }

    try {
      const userRequests = await fetchConnectionRequests(String(userId));
      const request = userRequests.find((req) => req.requester === requesterId);
      if (!request) {
        dispatch({
          type: UserConnectionActionTypes.REJECT_CONNECTION_FAILURE,
          payload: "Request does not exist.",
        });
        return;
      }

      dispatch({
        type: UserConnectionActionTypes.REJECT_CONNECTION_REQUEST,
        payload: { requesterId },
      });

      await postRejectConnectionRequest(String(request.id));
      dispatch({
        type: UserConnectionActionTypes.REJECT_CONNECTION_SUCCESS,
        payload: { requestId: request.id },
      });
    } catch (err: any) {
      console.error("Error rejecting request:", err);
      dispatch({
        type: UserConnectionActionTypes.REJECT_CONNECTION_REVERT,
        payload: {
          error: err?.response?.data?.message || "Failed to reject request.",
          request: {
            id: -1,
            requester: requesterId,
            recipient: userId,
            status: "pending",
          },
        },
      });
    }
  };

  const removeConnectionRequest = async (
    senderId: number,
    recipientId: number
  ) => {
    if (!senderId) {
      dispatch({
        type: UserConnectionActionTypes.DELETE_CONNECTION_REQUEST_FAILURE,
        payload: "User is not logged in or has no valid ID.",
      });
      return;
    }
    if (senderId === recipientId) {
      dispatch({
        type: UserConnectionActionTypes.DELETE_CONNECTION_REQUEST_FAILURE,
        payload: "You can't cancel a request to yourself.",
      });
      return;
    }

    try {
      const sentRequests = await fetchSentConnectionRequests(String(senderId));
      const request = sentRequests.find((req) => req.recipient === recipientId);
      if (!request) {
        dispatch({
          type: UserConnectionActionTypes.DELETE_CONNECTION_REQUEST_FAILURE,
          payload: "Connection request does not exist.",
        });
        return;
      }
      const users = await fetchAllUsers();
      const recipientUser = users.find((u) => u.id === recipientId);
      if (!recipientUser) {
        dispatch({
          type: UserConnectionActionTypes.DELETE_CONNECTION_REQUEST_FAILURE,
          payload: "Recipient user not found.",
        });
        return;
      }

      dispatch({
        type: UserConnectionActionTypes.DELETE_CONNECTION_REQUEST,
        payload: { recipientId },
      });

      await cancelConnectionRequest(senderId, recipientId);
      dispatch({
        type: UserConnectionActionTypes.DELETE_CONNECTION_REQUEST_SUCCESS,
        payload: { requestId: request.id, recipientId },
      });
    } catch (err: any) {
      console.error(
        `Error cancelling connection request for sender ${senderId} to recipient ${recipientId}:`,
        err
      );
      dispatch({
        type: UserConnectionActionTypes.DELETE_CONNECTION_REQUEST_REVERT,
        payload: {
          error:
            err?.response?.data?.message ||
            "Failed to cancel connection request.",
          request: {
            id: -1,
            requester: senderId,
            recipient: recipientId,
            status: "pending",
          },
          user: { id: recipientId, username: "Unknown" },
        },
      });
    }
  };

  const deleteConnection = async (recipientId: number, userId: number) => {
    if (!userId) {
      dispatch({
        type: UserConnectionActionTypes.DELETE_CONNECTION_FAILURE,
        payload: "User is not logged in or has no valid ID.",
      });
      return;
    }
    if (userId === recipientId) {
      dispatch({
        type: UserConnectionActionTypes.DELETE_CONNECTION_FAILURE,
        payload: "You can't remove yourself.",
      });
      return;
    }

    dispatch({
      type: UserConnectionActionTypes.DELETE_CONNECTION,
      payload: { recipientId },
    });
    try {
      await removeConnection(String(userId), String(recipientId));
      dispatch({
        type: UserConnectionActionTypes.DELETE_CONNECTION_SUCCESS,
        payload: { connectionId: recipientId },
      });
    } catch (err: any) {
      console.error("Error removing connection:", err);
      dispatch({
        type: UserConnectionActionTypes.DELETE_CONNECTION_FAILURE,
        payload: err?.response?.data?.message || "Failed to remove connection.",
      });
    }
  };

  const handleConnectionStatus = (recipientId: number, userId: number) => {
    if (!userId || !recipientId) return "unconnected";
    const connection = userConnectionState.connections?.find(
      (conn) => conn.id === recipientId
    );
    const isPendingRequest = userConnectionState.userSentRequests.find(
      (request) =>
        request.recipient === recipientId && request.status === "pending"
    );
    const isPendingAcceptRequest =
      userConnectionState.userConnectionRequests.find(
        (request) =>
          request.requester === recipientId && request.status === "pending"
      );

    if (connection) return "connection";
    if (isPendingRequest) return "sent_pending";
    if (isPendingAcceptRequest) return "recieved_pending";
    return "unconnected";
  };

  const getAllConnections = async (userId: number) => {
    if (!userId) {
      dispatch({
        type: UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS_FAILURE,
        payload: "User is not logged in or has no valid ID.",
      });
      return;
    }

    dispatch({ type: UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS });
    try {
      const userConnections = await fetchUserConnection(String(userId));
      dispatch({
        type: UserConnectionActionTypes.SET_CONNECTIONS,
        payload: userConnections,
      });
    } catch (err) {
      console.error("Error fetching connections:", err);
      dispatch({
        type: UserConnectionActionTypes.FETCH_CONNECTION_REQUESTS_FAILURE,
        payload: "Failed to fetch connections.",
      });
    }
  };

  const handleConnectionQuery = (value: string) => {
    const filteredArr = userConnectionState.connections.filter((connection) =>
      connection.username?.toLowerCase().includes(value.toLowerCase())
    );
    dispatch({
      type: UserConnectionActionTypes.FILTER_CONNECTIONS,
      payload: filteredArr,
    });
  };

  return (
    <UserConnectionContext.Provider
      value={{
        userConnectionState,
        createConnectionRequest,
        getConnectionRequest,
        getSentConnectionRequest,
        acceptConnectionRequest,
        rejectConnectionRequest,
        deleteConnection,
        removeConnectionRequest,
        handleConnectionStatus,
        getAllConnections,
        handleConnectionQuery,
      }}>
      {children}
    </UserConnectionContext.Provider>
  );
};

export const useUserConnection = (): UserConnectionContextType => {
  const context = useContext(UserConnectionContext);
  if (!context) {
    throw new Error(
      "useUserConnection must be used within a UserConnectionProvider"
    );
  }
  return context;
};
