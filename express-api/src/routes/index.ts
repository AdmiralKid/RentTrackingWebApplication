import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { ITokenService } from "../services/tokenService";
import { IUserService } from "../services/userService";
import { Middlewares, Services } from "../sever";
import { UserRoutes } from "./userRoutes";

export class BaseRoutes {
	private _router: Router;

	/**
	 *
	 */
	constructor(
		private _services: Services,
		private _middlewares: Middlewares
	) {
		this._router = Router();
	}

	get routes() {
		const { _router, _services, _middlewares } = this;

		const userRoutes = new UserRoutes(_services, _middlewares);

		_router.use("/user", userRoutes.routes);

		return _router;
	}
}
