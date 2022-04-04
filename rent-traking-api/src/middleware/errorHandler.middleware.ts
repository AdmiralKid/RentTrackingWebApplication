import { NextFunction, Request, Response } from "express";

export function errorHandler(
    error: any,
    _: Request,
    res: Response,
    __: NextFunction
) {
    res.json({ error });
}
