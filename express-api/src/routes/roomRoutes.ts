import { Router } from "express";
import { Middlewares } from "../server/middlewares";
import { Services } from "../server/services";

export class RoomRoutes {
	private _router: Router;

	/**
	 *
	 */
	constructor({}: Services, {}: Middlewares) {
		this._router = Router();
	}

	get routes() {
		const { _router } = this;
		return _router;
	}
}
