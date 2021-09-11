import jwt from "jsonwebtoken";

import { User } from "../models/userModel";
import { UserFactory } from "./userFactory";

export interface ITokenService {
	getAccessToken(user: User): Promise<string>;
	getUserFromToken(token: string): Promise<User>;
}

export class TokenService implements ITokenService {
	/**
	 *
	 */
	constructor(private _userFactory: UserFactory) {}
	getUserFromToken = (token: string): Promise<User> => {
		const tokenObj = jwt.verify(token, "SECRET");
		const { user } =
			typeof tokenObj === "string" ? JSON.parse(tokenObj) : tokenObj;
		const { username, userId, email, userType } = user;
		return Promise.resolve(
			this._userFactory.createUser(username, email, userType, userId)
		);
	};
	getAccessToken = (user: User): Promise<string> => {
		const token = jwt.sign({ user }, "SECRET");
		return Promise.resolve(token);
	};
}
