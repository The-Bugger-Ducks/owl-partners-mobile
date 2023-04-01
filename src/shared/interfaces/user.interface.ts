export enum RoleEnum {
  ADMIN = 'ADMIN',
  SIMPLE = 'SIMPLE'
}

export interface IUser {
  id: string
  name: string
  lastName: string
  email: string
  role: RoleEnum
  createdAt: Date
}

export interface IUserAuthenticated extends IUser {
  token: string
}

export interface IUserLogin {
  email: string
  password: string
}
