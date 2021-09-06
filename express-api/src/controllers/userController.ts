import { Request, Response, NextFunction } from "express";

import { User } from "../models/userModel";
import tokenService, { ITokenService } from "../services/tokenService";
import userService, { IUserService } from "../services/userService";

class UserController {
	/**
	 *
	 */
	constructor(
		private _userService: IUserService,
		private _tokenService: ITokenService
	) {}

	register = (req: Request, res: Response, next: NextFunction) => {
		const user = res.locals.user as User;
		const password = res.locals.password as string;
		this._userService
			.createUser(user, password)
			.then(() => {
				res.json({ message: "User created" });
			})
			.catch(next);
	};

	deleteUser = (req: Request, res: Response, next: NextFunction) => {
		const { userId } = res.locals.user as User;
		this._userService
			.deleteUser(userId)
			.then(() => {
				res.json({ message: "User Deleted" });
			})
			.catch(next);
	};

	signin = (req: Request, res: Response, next: NextFunction) => {
		const credentials = res.locals.credentials as {
			username: string;
			password: string;
		};
		const { username, password } = credentials;
		this._userService
			.authenticateUser(username, password)
			.then((user) => {
				this._tokenService
					.getAccessToken(user)
					.then((token) => {
						res.json({ token });
					})
					.catch(next);
			})
			.catch(next);
	};

	getUser = (req: Request, res: Response, next: NextFunction) => {
		const { user } = res.locals;
		res.json(user);
	};
}

const userController = new UserController(userService, tokenService);

export default userController;
