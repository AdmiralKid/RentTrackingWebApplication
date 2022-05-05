import * as auth from "firebase-admin/auth";
import { NextFunction, Request, Response } from "express";

export const verifyClientUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers["token"];

    if (!token) throw new Error("TOKEN NOT FOUND");

    let decodedToken = await auth.getAuth().verifyIdToken(token as string);
    res.locals["decodedToken"] = decodedToken;

    next();
  } catch (error) {
    next(error);
  }
};
