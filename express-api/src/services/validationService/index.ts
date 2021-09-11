import { InputCredentials, User } from "../../models/userModel";
import { IUserFactory } from "../userFactory";
import {
	credentialsSchema,
	emailSchema,
	passwordSchema,
	userSchema,
} from "./schemas";

export interface IValidationService {
	validateUser(user: any): Promise<User>;
	validatePassword(password: any): Promise<string>;
	validateCredentials(credentials: any): Promise<InputCredentials>;
}

export class ValidationService implements IValidationService {
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

	validateCredentials = (credentials: any): Promise<InputCredentials> => {
		const { usernameOrEmail, password } = credentials;
		let inputCredentials: InputCredentials = { password };
		const { error } = emailSchema.required().validate(usernameOrEmail);
		if (error) {
			inputCredentials.username = usernameOrEmail;
		} else {
			inputCredentials.email = usernameOrEmail;
		}
		return credentialsSchema.validateAsync(inputCredentials);
	};
}
