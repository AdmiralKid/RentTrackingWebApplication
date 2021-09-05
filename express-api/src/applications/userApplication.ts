import { User } from "../models/userModel";
import { IUserService, userService } from "../services/userService";

export class UserApplication {
	/**
	 *
	 */
	constructor(private _userSerivce: IUserService) {}

	createUser(user: User, password: string) {
		return this._userSerivce.createUser(user, password);
	}

	deleteUser(userId: string) {
		return this._userSerivce.deleteUser(userId);
	}
}

export const userApplication = new UserApplication(userService);
