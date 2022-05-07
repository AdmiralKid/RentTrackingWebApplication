import * as auth from "firebase-admin/auth";
import { NextFunction, Request, Response } from "express";
import { APIError } from "../modules/error/api-error.model";

export const verifyClientUserToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let token = req.headers["token"];

		if (!token) throw new APIError(401, "TOKEN NOT FOUND");

		let decodedToken = await auth.getAuth().verifyIdToken(token as string);
		res.locals["decodedToken"] = decodedToken;

		next();
	} catch (error) {
		next(error);
	}
};
