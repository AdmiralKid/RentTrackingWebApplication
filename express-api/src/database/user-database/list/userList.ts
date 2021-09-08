import { Credentials, User, UserType } from "../../../models/userModel";
import { IUserDb } from "../interface";

export class UserList implements IUserDb {
	private _userList: User[];
	private _passwordList: { userId: string; password: string }[];
	/**
	 *
	 */
	constructor() {
		this._passwordList = [];
		this._userList = [];
	}

	getCredentialsByUsername = (username: string): Promise<Credentials> => {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.username === username);
			if (user) {
				const { userId, email } = user;
				const password = this._passwordList.find(
					(x) => x.userId === userId
				)!.password;
				const credentials: Credentials = {
					userId,
					username,
					email,
					password,
				};
				res(credentials);
			} else {
				rej(new Error("User does not exist"));
			}
		});
	}

	getCredentialsByEmail = (email: string): Promise<Credentials> => {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.email === email);
			if (user) {
				const { userId, username } = user;
				const password = this._passwordList.find(
					(x) => x.userId === userId
				)!.password;
				const credentials: Credentials = {
					userId,
					username,
					email,
					password,
				};
				res(credentials);
			} else {
				rej(new Error("User does not exist"));
			}
		});
	};

	insertUser = (
		userId: string,
		username: string,
		email: string,
		userType: UserType,
		password: string
	): Promise<void> => {
		return new Promise((res, rej) => {
			if (!this._userList.find((x) => x.userId === userId)) {
				this._userList.push({ userId, username, email, userType });
				this._passwordList.push({ userId, password });
				res();
			} else {
				rej(new Error("User already exists"));
			}
		});
	};

	deleteUser = (userId: string): Promise<void> => {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.userId === userId);
			if (user) {
				this._userList = this._userList.filter(
					(x) => x.userId !== userId
				);
				this._passwordList = this._passwordList.filter(
					(x) => x.userId !== userId
				);
				res();
			} else {
				rej(new Error("User does not exist"));
			}
		});
	};

	getUserById = (userId: string): Promise<User> => {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.userId === userId);
			if (user) {
				res(user);
			} else {
				rej(new Error("User does not exist"));
			}
		});
	};
}

export const userList = new UserList();
