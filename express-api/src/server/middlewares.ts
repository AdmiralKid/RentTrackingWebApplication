import { AuthMiddleware } from "../middleware/authMiddleware";
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { Services } from "./services";

/**
 * Create an attribute of the middleware interface/class
 */

export interface Middlewares {
	authMiddleware: AuthMiddleware;
	validationMiddleware: ValidationMiddleware;
}

export class Middlewares {
	/**
	 * Initialize the declared variable with the use of create(<ClassName>)
	 *
	 * Make sure your middleware class is of type = new (:Services?)
	 */
	constructor(private _services: Services) {
		const { create } = this;
		this.authMiddleware = create(AuthMiddleware);
		this.validationMiddleware = create(ValidationMiddleware);
	}

	//#region private memebers
	private create = <T>(implementor: new (s: Services) => T): T => {
		return new implementor(this._services);
	};
	//#endregion
}
