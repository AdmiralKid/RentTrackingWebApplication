import jwt from "jsonwebtoken";
import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { userDb } from "../database";
import { IUserAuth, IUserDetails, IAuthToken } from "../interfaces";
import { userAuthSchema } from "../schemas";

export class User {
	userAuth: IUserAuth;
	userDetails?: IUserDetails;

	constructor(
		public userName: string,
		public password: string,
		public userId: number = -1
	) {
		this.userAuth = {
			userId: userId,
			userName: userName,
			userPassword: password,
		};
	}

	static GenerateUser(obj: any): User | Joi.ValidationError {
		const result = userAuthSchema.validate(obj);
		if (result.error) {
			return result.error;
		} else {
			return new User(obj.userName, obj.userPassword);
		}
	}

	static Authenticate(req: Request, res: Response, next: NextFunction) {
		const authorizationHeader = req.headers["authorization"]?.split(" ");
		if (!authorizationHeader) {
			return res.status(401).send("NO AUTH");
		}
		const accessToken = authorizationHeader[1];
		const secret = process.env.ACCESS_TOKEN_SECRET ?? "SECRET";
		jwt.verify(accessToken, secret, (err, user) => {
			const t = new Date().valueOf();
			if (err) {
				return res.status(403).send("FORBIDDEN");
			} else {
				const { userId, issueTime } = <IAuthToken>user;
				if (t - issueTime <= 200000) {
					req.token = <IAuthToken>user;
					next();
					return;
				}
				return res.status(403).send("YOUR TOKEN HAS EXPIRED");
			}
		});
	}

	async GetAccessToken(): Promise<[string, number] | null> {
		return new Promise((res, rej) => {
			const issueTime = new Date().valueOf();
			const { userName, password } = this;
			userDb
				.AuthenticateUserCredentials(userName, password)
				.then((user: IUserAuth | null) => {
					if (user == null) {
						return res(null);
					}
					const token = jwt.sign(
						{ userId: user.userId, issueTime },
						process.env.ACCESS_TOKEN_SECRET ?? "SECRET"
					);
					res([token, issueTime]);
				})
				.catch((err) => {
					rej(err);
				})
				.finally();
		});
	}

	async InsertUser(): Promise<Boolean> {
		const { userName, password } = this;
		return new Promise((res, rej) => {
			userDb
				.InsertUserCredentials(userName, password)
				.then((isInserted: Boolean) => {
					res(isInserted);
				})
				.catch((err: Error) => {
					rej(err);
				})
				.finally();
		});
	}

	async DeleteUser(): Promise<Boolean> {
		const { userId } = this;
		return new Promise((res, rej) => {
			userDb
				.DeleteUser(userId)
				.then((isInserted: Boolean) => {
					res(isInserted);
				})
				.catch((err: Error) => {
					rej(err);
				})
				.finally();
		});
	}
}

declare global {
	namespace Express {
		export interface Request {
			token: IAuthToken;
		}
	}
}
