export interface registerPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export enum Roles {
  user = 'User',
  admin = 'Admin',
}
