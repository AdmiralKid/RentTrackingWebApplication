import { NextFunction, Request, Response } from "express";

import { User } from "../models/userModel";
import validationService, {
	IValidationService,
} from "../services/validationService";

class ValidationMiddleware {
	/**
	 *
	 */
	constructor(private _validationService: IValidationService) {}

	validateUser = (req: Request, res: Response, next: NextFunction) => {
		const { user } = req.body;
		console.log(user);
		if (user) {
			this._validationService
				.validateUser(user)
				.then((validUser) => {
					res.locals.user = validUser;
					next();
				})
				.catch(next);
		} else {
			next(new Error('"user" is not provided in body'));
		}
	};

	validatePassword = (req: Request, res: Response, next: NextFunction) => {
		const { password } = req.body;
		console.log(password);
		if (password) {
			this._validationService
				.validatePassword(password)
				.then((validPassword) => {
					res.locals.password = validPassword;
					next();
				})
				.catch(next);
		} else {
			next(new Error('"password" is not provided in body'));
		}
	};
	validateCredentials = (req: Request, res: Response, next: NextFunction) => {
		const { credentials } = req.body;
		this._validationService
			.validateCredentials(credentials)
			.then((validCredentials) => {
				res.locals.credentials = validCredentials;
				next();
			})
			.catch(next);
	};
}

const validationMiddleware = new ValidationMiddleware(validationService);

export default validationMiddleware;
