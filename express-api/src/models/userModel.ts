import { v4 as uuidv4 } from "uuid";

export type UserType = "client";

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
