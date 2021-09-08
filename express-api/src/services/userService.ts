import bcrypt from "bcrypt";
import userDb from "../database/user-database/";

import { IUserDb } from "../database/user-database/interface";
import { InputCredentials, User } from "../models/userModel";
import { userFactory } from "./userFactory";

export interface IUserService {
	createUser(user: User, password: string): Promise<void>;
	deleteUser(userId: string): Promise<void>;
	getUser(userId: string): Promise<User>;
	authenticateUser(credentials: InputCredentials): Promise<User>;
}

class UserService implements IUserService {
	/**
	 *
	 */
	constructor(private _userDb: IUserDb) {}

	authenticateUser = (credentials: InputCredentials): Promise<User> => {
		return new Promise((res, rej) => {
			const { username, email, password } = credentials;

			const { getCredentialsByUsername, getCredentialsByEmail } =
				this._userDb;

			const getCredentials = username
				? getCredentialsByUsername
				: email
				? getCredentialsByEmail
				: undefined;

			const inputCred = username ?? email;

			if (getCredentials && inputCred) {
				getCredentials(inputCred)
					.then((credentials) => {
						const { password: encPassword, userId } = credentials;
						if (bcrypt.compareSync(password, encPassword)) {
							this._userDb
								.getUserById(userId)
								.then((user) => {
									const {
										userId,
										username,
										email,
										userType,
									} = user;
									res(
										userFactory.createUser(
											username,
											email,
											userType,
											userId
										)
									);
								})
								.catch(rej);
						} else {
							rej(new Error("Password is incorrect"));
						}
					})
					.catch(rej);
			}
		});
	};

	createUser = (user: User, password: string): Promise<void> => {
		return new Promise((res, rej) => {
			const { userId, username, email, userType } = user;
			const encPassword = bcrypt.hashSync(password, 10);
			this._userDb
				.insertUser(userId, username, email, userType, encPassword)
				.then(res)
				.catch(rej);
		});
	};

	deleteUser = (userId: string): Promise<void> => {
		return new Promise((res, rej) => {
			this._userDb.deleteUser(userId).then(res).catch(rej);
		});
	};

	getUser = (userId: string): Promise<User> => {
		return Promise.resolve(this._userDb.getUserById(userId));
	};
}

export const userService = new UserService(userDb);
