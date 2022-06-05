import { NextFunction, Request, Response } from "express";
import { APIError } from "../modules/error/api-error.model";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Admin Middleware");
        let serverClientId = "5c846ded-cbc4-4402-8657-ce707252c964";
		let clientId = req.headers["clientid"];
		if (!clientId || clientId != serverClientId) throw new APIError(401, "Unauthorized");
		next();
	} catch (error) {
		next(error);
	}
};
