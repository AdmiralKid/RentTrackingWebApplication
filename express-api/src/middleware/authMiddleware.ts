import { Request, Response, NextFunction } from "express";

import tokenService, { ITokenService } from "../services/tokenService";

class AuthMiddleware {
	/**
	 *
	 */
	constructor(private _tokenService: ITokenService) {}

	verifyToken = (req: Request, res: Response, next: NextFunction) => {
		// console.log(this);
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

const authMiddleware = new AuthMiddleware(tokenService);

export default authMiddleware;
