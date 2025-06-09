import React, { createContext, useContext, useState, ReactNode } from "react";
import { Notifications } from "../types/notifications";

import { updateNotification } from "../../utils/api/notifications-api";

interface Notification {
  id: number;
  userId: number;
  senderId: number;
  type: string;
  message: string;
  eventId?: number | null;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsContextType {
  userNotifications: Notifications[] | [];
  setUserNotifications: (notifications: Notifications[]) => void;
  mainNotification: Notification | null;
  setMainNotification: (notification: Notification) => void;
  patchNotification: (id: number) => void;
  loading: boolean;
  error: string | null;
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
  const [userNotifications, setUserNotifications] = useState<
    Notifications[] | null
  >(null);
  const [mainNotification, setMainNotification] = useState<Notification | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const patchNotification = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const updatedNotificaton = await updateNotification(String(id));
    } catch (err) {
      console.error(`Error updating notification`, err);
      setError(`Failed to update notification.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        userNotifications,
        setUserNotifications,
        mainNotification,
        setMainNotification,
        patchNotification,
        loading,
        error,
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
