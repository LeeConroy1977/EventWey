export interface Request {
  id: number;
  requester: number;
  recipient: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}
