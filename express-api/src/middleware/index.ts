import { Request, Response, NextFunction } from "express";
import { tokenApplication } from "../applications/tokenApplication";
import { validationApplication } from "../applications/validationApplication/validationApplication";
import { User, userFactory, UserFactory } from "../models/userModel";

export const userValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { user } = req.body;
	validationApplication
		.validateUser(user)
		.then((validUser) => {
			const { username, email, userType } = validUser;
			const validUserObj = userFactory.createUser(
				username,
				email,
				userType
			);
			res.locals.user = validUserObj;
			next();
		})
		.catch(next);
};

export const passwordValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { password } = req.body;
	validationApplication
		.validatePassword(password)
		.then((validPassword) => {
			res.locals.password = validPassword;
			next();
		})
		.catch(next);
};

export const credentialsValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { credentials } = req.body;
	validationApplication
		.validateCredentials(credentials)
		.then((validCredentials) => {
			res.locals.credentials = validCredentials;
			next();
		})
		.catch(next);
};

export const tokenVerification = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const auth = req.header("authorization") as string;
	if (!auth) {
		next(new Error("No authorization"));
	}
	const token = auth.split(" ")[1];
	tokenApplication
		.verifyAccessToken(token)
		.then((user) => {
			res.locals.user = user;
			next();
		})
		.catch(next);
};
