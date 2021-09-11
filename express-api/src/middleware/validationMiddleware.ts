import { NextFunction, Request, Response } from "express";

import { IValidationService } from "../services/validationService";
import { Services } from "../server";

export class ValidationMiddleware {
	private _validationService: IValidationService;
	/**
	 *
	 */
	constructor({ validationService }: Services) {
		this._validationService = validationService;
	}

	validateUser = (req: Request, res: Response, next: NextFunction) => {
		const { user } = req.body;
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
