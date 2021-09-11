import { Request, Response, NextFunction } from "express";

import { ITokenService } from "../services/tokenService";
import { Services } from "../sever";

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
}
