import { Credentials, User, UserType } from "../../models/userModel";

export interface IUserDb {
	insertUser(
		userId: string,
		username: string,
		email: string,
		userType: UserType,
		password: string
	): Promise<void>;
	deleteUser(userId: string): Promise<void>;
	getUserById(userId: string): Promise<User>;
	getCredentialsByUsername(username: string): Promise<Credentials>;
	getCredentialsByEmail(email: string): Promise<Credentials>;
}
