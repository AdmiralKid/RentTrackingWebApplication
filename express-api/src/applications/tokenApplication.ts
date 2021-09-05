import { ITokenService, tokenService } from "../services/tokenService";
import { IUserService, userService } from "../services/userService";
import { User } from "../models/userModel";

export class TokenApplication {
	/**
	 *
	 */
	constructor(
		private _tokenService: ITokenService,
		private _userService: IUserService
	) {}

	getAccessToken(username: string, password: string): Promise<string> {
		return new Promise((res, rej) => {
			this._userService
				.authenticateUser(username, password)
				.then((user) => {
					this._tokenService
						.getAccessToken(user)
						.then(res)
						.catch(rej);
				})
				.catch(rej);
		});
	}
	verifyAccessToken(token: string): Promise<User> {
		return this._tokenService.getUserFromToken(token);
	}
}

export const tokenApplication = new TokenApplication(tokenService, userService);
