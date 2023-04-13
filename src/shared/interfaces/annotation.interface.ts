export interface IComment {
  id: string;
  partnerId: string;
  User: {
    name: string;
    lastName: string;
    email: string;
  };
  comment: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
  disabled: boolean;
}
