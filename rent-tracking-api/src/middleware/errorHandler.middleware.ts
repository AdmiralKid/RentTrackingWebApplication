import { NextFunction, Request, Response } from "express";
import { APIError } from "../modules/error/api-error.model";

export const errorHandler = (error: any, _: Request, res: Response, __: NextFunction) => {
	if (error instanceof APIError) res.status(error.code).json({ error });
	else res.status(500).json({ error });
};
