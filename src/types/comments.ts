import { User } from "./user";

interface Like {
  id: number;
  user: number;
  comment: Comment;
}

export interface Comment {
  id: number | undefined;
  content: string;
  groupId: number | null;
  eventId: number | null;
  user: User;
  replies: Comment;
  parentComment: Comment | null;
  likes: Like[];
  likeCount: number;
  createdAt: Date;
}
