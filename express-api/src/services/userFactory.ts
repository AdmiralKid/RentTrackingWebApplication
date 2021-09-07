import { v4 as uuidv4 } from "uuid";

import { User, UserType } from "../models/userModel";

export interface IUserFactory {
	createUser: (
		username: string,
		email: string,
		userType: UserType,
		userId?: string
	) => User;
}

export class UserFactory implements IUserFactory {
	createUser = (
		username: string,
		email: string,
		userType: UserType,
		userId?: string
	): User => {
		return new User(userId ?? uuidv4(), username, email, userType);
	};
}

const userFactory = new UserFactory();
export default userFactory;
