import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

import { ITokenService } from "../services/tokenService";
import { Services } from "../server";

export class AuthMiddleware {
	private _tokenService: ITokenService;
	/**
	 *
	 */
	constructor({ tokenService }: Services) {
		this._tokenService = tokenService;
	}

	verifyToken = (req: Request, res: Response, next: NextFunction) => {
		const auth = req.header("authorization") as string;
		if (!auth) {
			next(new Error("No authorization"));
		}
		const token = auth.split(" ")[1];
		this._tokenService
			.getUserFromToken(token)
			.then((user) => {
				res.locals.user = user;
				next();
			})
			.catch(next);
	};

	verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
		const { userType } = res.locals.user as User;
		if (userType === "admin") {
			next();
		} else {
			next(new Error("This API call is FORBIDDEN"));
		}
	};
}
