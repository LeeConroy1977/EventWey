import { Notification } from "../types/notifications";

export enum NotificationActionTypes {
  FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS",
  FETCH_NOTIFICATIONS_SUCCESS = "FETCH_NOTIFICATIONS_SUCCESS",
  FETCH_NOTIFICATIONS_FAILURE = "FETCH_NOTIFICATIONS_FAILURE",
  UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION",
  UPDATE_NOTIFICATION_SUCCESS = "UPDATE_NOTIFICATION_SUCCESS",
  UPDATE_NOTIFICATION_FAILURE = "UPDATE_NOTIFICATION_FAILURE",
}

export interface NotificationState {
  userNotifications: Notification[];
  loading: boolean;
  error: string | null;
}

export const initialNotificationState: NotificationState = {
  userNotifications: [],
  loading: false,
  error: null,
};

interface NotificationAction {
  type: NotificationActionTypes;
  payload?: any;
}

export const NotificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case NotificationActionTypes.FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NotificationActionTypes.FETCH_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case NotificationActionTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        userNotifications: action.payload.notifications,

        loading: false,
        error: null,
      };
    case NotificationActionTypes.UPDATE_NOTIFICATION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case NotificationActionTypes.UPDATE_NOTIFICATION_SUCCESS:
      if (!action.payload.notification || !action.payload.notification.id) {
        return {
          ...state,
          loading: false,
          error: "Invalid notification data",
        };
      }
      return {
        ...state,
        userNotifications: state.userNotifications.map((notification) =>
          notification.id === action.payload.notification.id
            ? { ...notification, ...action.payload.notification }
            : notification
        ),
        loading: false,
        error: null,
      };
    case NotificationActionTypes.UPDATE_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
