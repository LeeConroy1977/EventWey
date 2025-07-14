import { User } from "./user";

export interface Notification {
  id: number;
  user: User;
  senderId: number;
  type: string;
  message: string;
  eventId?: number | null;
  isRead: boolean;
  createdAt: string;
}
