export interface registerPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface loginPayload {
  email: string;
  password: string;
}

export enum roles {
  user = 'User',
  admin = 'Admin',
}

export enum UserAction {
  BAN = 'BAN',
  UNBAN = 'UNBAN',
}

export interface updateUserRestrictionPayload {
  action: UserAction;
}
