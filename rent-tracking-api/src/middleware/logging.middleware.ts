import { NextFunction, Request, Response } from "express";

export const logRequest = (req: Request, _: Response, next: NextFunction) => {
    console.log(`${req.method}: ${req.url}: ${JSON.stringify(req.body)}`);
    next();
};
