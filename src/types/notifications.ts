import { User } from "./user";

export interface Notifications {
  id: number;
  user: User;
  senderId: number;
  type: string;
  message: string;
  eventId?: number | null;
  isRead: boolean;
  createdAt: string;
}
