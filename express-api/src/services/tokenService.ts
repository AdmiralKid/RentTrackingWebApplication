import jwt from "jsonwebtoken";

import { User } from "../models/userModel";
import userFactory from "./userFactory";

export interface ITokenService {
	getAccessToken: (user: User) => Promise<string>;
	getUserFromToken: (token: string) => Promise<User>;
}

export class TokenService implements ITokenService {
	getUserFromToken = (token: string): Promise<User> => {
		const tokenObj = jwt.verify(token, "SECRET");
		const { user } =
			typeof tokenObj === "string" ? JSON.parse(tokenObj) : tokenObj;
		const { username, userId, email, userType } = user;
		return Promise.resolve(
			userFactory.createUser(username, email, userType, userId)
		);
	};
	getAccessToken = (user: User): Promise<string> => {
		const token = jwt.sign({ user }, "SECRET");
		return Promise.resolve(token);
	};
}

const tokenService = new TokenService();

export default tokenService;
