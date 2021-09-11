import { Router } from "express";
import { Middlewares, Services } from "../server";
import { AdminRoutes } from "./adminRoutes";
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
		const adminRoutes = new AdminRoutes(_services, _middlewares);

		_router.use("/user", userRoutes.routes);
		_router.use("/admin", adminRoutes.routes);

		return _router;
	}
}
