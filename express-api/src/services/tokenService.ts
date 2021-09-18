import jwt from "jsonwebtoken";

import { User } from "../models/userModel";
import { Services } from "../server/services";
import { IUserFactory, UserFactory } from "./userFactory";

export interface ITokenService {
	getAccessToken(user: User): Promise<string>;
	getUserFromToken(token: string): Promise<User>;
}

export class TokenService implements ITokenService {
	private _userFactory: IUserFactory;
	/**
	 *
	 */
	constructor({ userFactory }: Services) {
		this._userFactory = userFactory;
	}
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
