import { Request, Response, NextFunction } from "express";

import { ITokenService, tokenService } from "../services/tokenService";

class AuthMiddleware {
	/**
	 *
	 */
	constructor(private _tokenService: ITokenService) {}

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

export const authMiddleware = new AuthMiddleware(tokenService);
