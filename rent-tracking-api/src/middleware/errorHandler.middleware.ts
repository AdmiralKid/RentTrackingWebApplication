import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    error: any,
    _: Request,
    res: Response,
    __: NextFunction
) => {
    res.json({ error });
};
