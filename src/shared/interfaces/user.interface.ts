export enum RoleEnum {
  ADMIN = "ADMIN",
  SIMPLE = "SIMPLE",
}

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: RoleEnum;
  createdAt: Date;
}

export interface IUserAuthenticated {
  token: string;
  user: IUser;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserUpdate {
  name: string;
  lastName: string;
  email?: string;
  password?: string;
}

export interface IUserEdit {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserModalPropsForm {
  visible: boolean;
  onClose: () => void;
  closeAfterUpdate: () => void;
  userProps: IUserEdit;
}
