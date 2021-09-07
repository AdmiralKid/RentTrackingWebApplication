import { User } from "../../models/userModel";
import userFactory, { IUserFactory } from "../userFactory";
import { credentialsSchema, passwordSchema, userSchema } from "./schemas";

export interface IValidationService {
	validateUser: (user: any) => Promise<User>;
	validatePassword: (password: any) => Promise<string>;
	validateCredentials: (
		credentials: any
	) => Promise<{ username: string; passoword: string }>;
}

class ValidationService implements IValidationService {
	/**
	 *
	 */
	constructor(private _userFactory: IUserFactory) {}

	validateUser = (user: any): Promise<User> => {
		return new Promise((res, rej) => {
			userSchema
				.validateAsync(user)
				.then((value) => {
					const { username, email, userType } = value;
					res(
						this._userFactory.createUser(username, email, userType)
					);
				})
				.catch(rej);
		});
	};
	validatePassword = (password: any): Promise<string> => {
		return passwordSchema.validateAsync(password);
	};
	validateCredentials = (
		credentials: any
	): Promise<{ username: string; passoword: string }> => {
		return credentialsSchema.validateAsync(credentials);
	};
}

const validationService = new ValidationService(userFactory);

export default validationService;
