import { v4 as uuidv4 } from "uuid";

export type UserType = "client" | "admin";

export type InputCredentials = Pick<
	Partial<Credentials>,
	"email" | "username"
> &
	Pick<Credentials, "password">;

export interface User {
	userId: string;
	username: string;
	email: string;
	userType: UserType;
}

export interface Credentials {
	userId: string;
	username: string;
	email: string;
	password: string;
}

interface Admin extends User {
	userType: Extract<UserType, "admin">;
}

export const userTypes: Record<UserType, string> = {
	client: "client",
	admin: "admin",
};
