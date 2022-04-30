export interface User {
  uid: string;
  name: string;
  phoneNumber: string;
  email: string;
  photoURL: string;
  userRoleId: UserRole;
}

export enum UserRole {
  DEFAULT = 0,
  OWNER = 1,
  TENANT = 2,
  ADMIN = 3,
}
