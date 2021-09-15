import { Router } from "express";
import { Middlewares } from "../server/middlewares";
import { Services } from "../server/services";
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
		const { create, _router } = this;

		const userRoutes = create(UserRoutes);
		const adminRoutes = create(AdminRoutes);

		_router.use("/user", userRoutes.routes);
		_router.use("/admin", adminRoutes.routes);

		return _router;
	}

	//#region private members
	private create = <T>(
		implementor: new (s: Services, m: Middlewares) => T
	): T => {
		return new implementor(this._services, this._middlewares);
	};
	//#endregion
}
