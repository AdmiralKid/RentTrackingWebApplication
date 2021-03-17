import jwt from "jsonwebtoken";
import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { UserDB } from "../database";
import { IUserAuth, IUserDetails, IAuthToken } from "../interfaces";
import { userSchema } from "../schemas";

export default class User {
	userDB: UserDB;
	userAuth: IUserAuth;
	userDetails?: IUserDetails;

	constructor(
		public userName: string,
		public password: string,
		userId?: number
	) {
		this.userAuth = {
			userId: userId ?? -1,
			userName: userName,
			userPassword: password,
		};
		this.userDB = new UserDB();
	}

	static GenerateUser(obj: any): User | Joi.ValidationError {
		const result = userSchema.validate(obj);
		if (result.error) {
			return result.error;
		} else {
			return new User(obj.userName, obj.password);
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
				if (t - issueTime <= 20000) {
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
			const { userName, password, userDB } = this;
			userDB
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
		const { userDB, userName, password } = this;
		return new Promise((res, rej) => {
			userDB
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
}

declare global {
	namespace Express {
		export interface Request {
			user?: User;
		}
	}
}
