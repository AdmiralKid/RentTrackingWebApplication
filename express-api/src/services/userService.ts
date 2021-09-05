import { User } from "../models/userModel";
import bcrypt from "bcrypt";

export interface IUserService {
	createUser(user: User, password: string): Promise<void>;
	deleteUser(userId: string): Promise<void>;
	getUser(userId: string): Promise<User>;
	getUserPassword(userId: string): Promise<string>;
	authenticateUser(username: string, password: string): Promise<User>;
}

export class UserService implements IUserService {
	private _userList: User[];
	private _passwordList: { userId: string; password: string }[];

	/**
	 *
	 */
	constructor() {
		this._userList = [];
		this._passwordList = [];
	}
	authenticateUser(username: string, password: string): Promise<User> {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.username === username);
			if (user) {
				const encPassword = this._passwordList.find(
					(x) => x.userId === user.userId
				)!.password;
				bcrypt.compare(password, encPassword).then((isEqual) => {
					if (isEqual) {
						res(user);
					} else {
						rej(new Error("Password does not match"));
					}
				});
			} else {
				rej(new Error("User does not exist"));
			}
		});
	}
	createUser(user: User, password: string): Promise<void> {
		return new Promise((res, rej) => {
			if (!this._userList.filter((x) => x.userId === user.userId)[0]) {
				this._userList.push(user);

				bcrypt.hash(password, 10).then((encPassword) => {
					this._passwordList.push({
						userId: user.userId,
						password: encPassword,
					});
					console.log(this._passwordList);
					console.log(this._userList);
					res();
				});
			} else {
				rej(new Error("User already exists"));
			}
		});
	}
	deleteUser(userId: string): Promise<void> {
		return new Promise((res, rej) => {
			const user = this._userList.find((x) => x.userId === userId);
			if (user) {
				this._userList = this._userList.filter(
					(x) => x.userId !== user.userId
				);
				this._passwordList = this._passwordList.filter(
					(x) => x.userId !== user.userId
				);
				res();
			} else {
				rej(new Error("User does not exist"));
			}
		});
	}
	getUser(userId: string): Promise<User> {
		const user = this._userList.find((x) => x.userId === userId);
		if (user) {
			return Promise.resolve(user);
		} else {
			throw new Error("User does not exist");
		}
	}
	getUserPassword(userId: string): Promise<string> {
		const password = this._passwordList.find(
			(x) => x.userId !== userId
		)?.password;
		if (!password) throw new Error("User does not exist");
		return Promise.resolve(password);
	}
}

export const userService = new UserService();
