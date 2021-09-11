import express, { Express, NextFunction, Request, Response } from "express";

import { IUserDb } from "./database/user-database/interface";
import { AuthMiddleware } from "./middleware/authMiddleware";
import { ValidationMiddleware } from "./middleware/validationMiddleware";
import { BaseRoutes } from "./routes";
import { ITokenService, TokenService } from "./services/tokenService";
import { UserFactory } from "./services/userFactory";
import { IUserService, UserService } from "./services/userService";
import {
	IValidationService,
	ValidationService,
} from "./services/validationService";

const PORT = 5000;
const HOST = "localhost";

export interface Services {
	userFactory: UserFactory;
	validationService: IValidationService;
	tokenService: ITokenService;
	userService: IUserService;
}

export interface Middlewares {
	authMiddleware: AuthMiddleware;
	validationMiddleware: ValidationMiddleware;
}

export class Server {
	app: Express;

	/**
	 *
	 */
	constructor(private _userDb: IUserDb) {
		this.app = express();
	}

	setup() {
		const { app } = this;

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		const services = this.configureServices();
		const middlewares = this.configureMiddlewares(services);
		const baseRoutes = new BaseRoutes(services, middlewares);

		app.use("/api", baseRoutes.routes);

		app.use((err: any, req: Request, res: Response, next: NextFunction) => {
			const { code, message, name, stack } = err;

			res.status(code ?? 500).json({ name, message, stack });
		});
	}

	configureServices(): Services {
		const userFactory = new UserFactory();
		const validationService = new ValidationService(userFactory);
		const tokenService = new TokenService(userFactory);
		const userService = new UserService(this._userDb, userFactory);

		return { userFactory, validationService, tokenService, userService };
	}

	configureMiddlewares(services: Services): Middlewares {
		const validationMiddleware = new ValidationMiddleware(services);
		const authMiddleware = new AuthMiddleware(services);

		return { authMiddleware, validationMiddleware };
	}

	run() {
		this.app.listen(PORT, HOST, () => {
			console.log(`Listening on http://${HOST}:${PORT}`);
		});
	}
}
