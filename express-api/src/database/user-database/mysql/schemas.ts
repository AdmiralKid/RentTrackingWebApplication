import { UserType } from "../../../models/userModel";

export interface UserTable {
	user_id: string;
	username: string;
	email: string;
	user_type: UserType;
}

export interface PasswordTable {
	user_id: string;
	password: string;
}

export interface AffectedRows {
	affected_rows: number;
}

export type CredentialsView = Pick<
	UserTable,
	"user_id" | "username" | "email"
> &
	Pick<PasswordTable, "password">;
