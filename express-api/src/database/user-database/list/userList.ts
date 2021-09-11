import { Credentials, User, UserType } from "../../../models/userModel";
import { IUserDb } from "../interface";

type UserTable = User & { approved: boolean };

export class UserList implements IUserDb {
	private _userList: UserTable[];
	private _passwordList: { userId: string; password: string }[];
	/**
	 *
	 */
	constructor() {
		this._passwordList = [];
		this._userList = [];
	}

	approveUser(userId: string): Promise<void> {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.userId === userId);
			if (user?.approved === false) {
				user.approved = true;
				res();
			} else {
				if (!user) rej(new Error("User does not exist"));
				else rej(new Error("User is already approved"));
			}
		});
	}
	rejectUser(userId: string): Promise<void> {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.userId === userId);
			if (user?.approved === false) {
				this._userList = this._userList.filter(
					(x) => x.userId !== userId
				);
				this._passwordList = this._passwordList.filter(
					(x) => x.userId !== userId
				);
				res();
			} else {
				if (!user) rej(new Error("User does not exist"));
				else rej(new Error("User is already approved"));
			}
		});
	}
	getUserRequests(): Promise<User[]> {
		return Promise.resolve(this._userList.filter((x) => !x.approved));
	}

	getCredentialsByUsername = (username: string): Promise<Credentials> => {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.username === username);
			if (user?.approved) {
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
				if (!user) rej(new Error("User does not exist"));
				else rej(new Error("User is not yet approved"));
			}
		});
	};

	getCredentialsByEmail = (email: string): Promise<Credentials> => {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.email === email);
			if (user?.approved) {
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
				if (!user) rej(new Error("User does not exist"));
				else rej(new Error("User is not yet approved"));
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
			const user = this._userList.find((x) => x.userId === userId);
			if (!user) {
				this._userList.push({
					userId,
					username,
					email,
					userType,
					approved: userType === "admin",
				});
				this._passwordList.push({ userId, password });
				res();
			} else {
				if (user.approved) rej(new Error("User already exists"));
				else rej(new Error("User is yet to be approved"));
			}
		});
	};

	deleteUser = (userId: string): Promise<void> => {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.userId === userId);
			if (user?.approved) {
				this._userList = this._userList.filter(
					(x) => x.userId !== userId
				);
				this._passwordList = this._passwordList.filter(
					(x) => x.userId !== userId
				);
				res();
			} else {
				if (!user) rej(new Error("User does not exist"));
				else rej(new Error("User is not yet approved"));
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
