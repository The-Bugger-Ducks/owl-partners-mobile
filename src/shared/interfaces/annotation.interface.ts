export interface IComment {
  id: string;
  partnerId: string;
  userId: string;
  userName: string;
  comment: string;
  title?: string;
  createdAt: string;
  updatedAt?: string;
}
