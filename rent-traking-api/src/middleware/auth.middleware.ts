//import {getAuth} from 'firebase/auth'
import * as auth from "firebase-admin/auth";
import { NextFunction, Request, Response } from "express";

export function verifyClientUserToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let token = req.headers["token"] as string;
    auth.getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            res.locals["decodedToken"] = decodedToken;
            next();
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
}
