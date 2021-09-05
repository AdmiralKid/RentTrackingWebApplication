import { v4 as uuidv4 } from "uuid";

type UserType = "client";

export class User {
	/**
	 *
	 */
	constructor(
		public userId: string,
		public username: string,
		public email: string,
		public userType: UserType
	) {}
}

export class UserFactory {
	createUser(
		username: string,
		email: string,
		userType: UserType,
		userId?: string
	): User {
		return new User(userId ?? uuidv4(), username, email, userType);
	}
}

export const userFactory = new UserFactory();
