import { AddService1, AddService2, IAddService } from "../services/addService";
import { AdminService, IAdminService } from "../services/adminService";
import { ITokenService, TokenService } from "../services/tokenService";
import { IUserFactory, UserFactory } from "../services/userFactory";
import { IUserService, UserService } from "../services/userService";
import {
	IValidationService,
	ValidationService,
} from "../services/validationService";
import { Databases } from "./databases";

/**
 * Create an attribute of the service interface/class
 */
export interface Services {
	userFactory: IUserFactory;
	userService: IUserService;
	adminService: IAdminService;
	tokenService: ITokenService;
	validationService: IValidationService;
	addService: IAddService;
}

export class Services {
	/**
	 * Initialize the declared variable with the use of create(<ClassName>)
	 * 
	 * Make sure your service class is of type = new (:Services?, :Databases?)
	 */
	constructor(private _databases: Databases) {
		const { create } = this;
		this.userFactory = create(UserFactory);
		this.userService = create(UserService);
		this.adminService = create(AdminService);
		this.tokenService = create(TokenService);
		this.validationService = create(ValidationService);
		this.addService = create(AddService2);
	}

	//#region private members
	private create = <T>(
		implementor: new (s: Services, d: Databases) => T
	): T => {
		return new implementor(this, this._databases);
	};
	//#endregion
}
