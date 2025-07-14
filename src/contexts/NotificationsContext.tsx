import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useState,
} from "react";
import { Notification } from "../types/notifications";

import {
  fetchUserNotifications,
  updateNotification,
} from "../../utils/api/notifications-api";
import {
  initialNotificationState,
  NotificationActionTypes,
  NotificationReducer,
} from "../reducers/NotificationsReducer";
import { useUser } from "./UserContext";

interface NotificationsContextType {
  notificationState: {
    userNotifications: Notification[] | [];
    loading: boolean;
    error: string | null;
  };

  patchNotification: (id: number) => void;
  getUserNotifications: (id: number) => void;
  mainNotification: Notification | undefined;
  setMainNotification: (notification: Notification) => void;
}

interface NotificationsProviderProps {
  children: ReactNode;
}

const NotificationsContext = createContext<NotificationsContextType | null>(
  null
);

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  const { user } = useUser();
  const [mainNotification, setMainNotification] = useState<Notification>();
  const [notificationState, dispatch] = useReducer(
    NotificationReducer,
    initialNotificationState
  );

  const getUserNotifications = async (id: number) => {
    if (!user?.id) {
      dispatch({
        type: NotificationActionTypes.FETCH_NOTIFICATIONS_FAILURE,
        payload: "User is not logged in or doesn't have a valid ID.",
      });
    }
    dispatch({
      type: NotificationActionTypes.FETCH_NOTIFICATIONS,
    });
    try {
      const notifications = await fetchUserNotifications(String(id));
      const uniqueNotificationsMap = new Map<string, Notification>();
      notifications.forEach((notification) => {
        const key = `${notification.senderId}_${notification.type}`;
        if (!uniqueNotificationsMap.has(key)) {
          uniqueNotificationsMap.set(key, {
            ...notification,
            id: parseInt(notification.id),
            senderId: parseInt(notification.senderId),
            eventId: notification.eventId
              ? parseInt(notification.eventId)
              : null,
          });
        }
      });
      const uniqueNotifications = Array.from(uniqueNotificationsMap.values());

      const unReadNotifictions = uniqueNotifications
        .filter((notificatons) => !notificatons.isRead)
        .sort((a, b) => a.createdAt - b.createdAt);
      const readNotifictions = uniqueNotifications
        .filter((notificatons) => notificatons.isRead)
        .sort((a, b) => a.createdAt - b.createdAt);

      const sortedNotifications = [...unReadNotifictions, ...readNotifictions];
      dispatch({
        type: NotificationActionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        payload: { notifications: sortedNotifications },
      });
      setMainNotification(sortedNotifications[0]);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      dispatch({
        type: NotificationActionTypes.FETCH_NOTIFICATIONS_FAILURE,
        payload: "Failed to fetch notifications.",
      });
    }
  };

  const patchNotification = async (id: number) => {
    dispatch({
      type: NotificationActionTypes.UPDATE_NOTIFICATION,
    });
    try {
      const updatedNotification = await updateNotification(String(id));
      if (!updatedNotification || !updatedNotification.id) {
        throw new Error("Invalid notification data returned from API");
      }
      dispatch({
        type: NotificationActionTypes.UPDATE_NOTIFICATION_SUCCESS,
        payload: { notification: updatedNotification },
      });
    } catch (err) {
      console.error(`Error updating notification`, err);
      dispatch({
        type: NotificationActionTypes.UPDATE_NOTIFICATION_FAILURE,
        payload: `Failed to update notification: ${err.message}`,
      });
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notificationState,
        getUserNotifications,
        patchNotification,
        setMainNotification,
        mainNotification,
      }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a notificationsProvider"
    );
  }
  return context;
};
