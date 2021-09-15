import { Router } from "express";
import { Middlewares } from "../server/middlewares";
import { Services } from "../server/services";
import { AdminRoutes } from "./adminRoutes";
import { RoomRoutes } from "./roomRoutes";
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
		const roomRoutes = new RoomRoutes(_services, _middlewares);

		_router.use("/user", userRoutes.routes);
		_router.use("/admin", adminRoutes.routes);
		_router.use("/room", roomRoutes.routes);

		return _router;
	}
}
