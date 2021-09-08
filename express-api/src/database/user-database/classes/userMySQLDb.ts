import { Connection } from "mysql";

import {
	UserType,
	User,
	Credentials,
	userTypes,
} from "../../../models/userModel";
import { conn } from "../../connections/mysql";
import { IUserDb } from "../interface";

class UserMySQLDb implements IUserDb {
	/**
	 *
	 */
	constructor(private _con: Connection) {}

	insertUser = (
		userId: string,
		username: string,
		email: string,
		userType: UserType,
		password: string
	): Promise<void> => {
		return new Promise((res, rej) => {
			this._con.query(
				"CALL `renttracking`.`insert_user`(?,?,?,?,?);",
				[userId, username, email, userType, password],
				(err, results, fields) => {
					if (err) {
						rej(err);
					} else {
						res();
					}
				}
			);
		});
	};

	deleteUser = (userId: string): Promise<void> => {
		return new Promise((res, rej) => {
			this._con.query(
				"CALL `renttracking`.`delete_user`(?);",
				[userId],
				(err, results, fields) => {
					if (err) {
						rej(err);
					} else {
						if (results[0][0].affected_rows!==0) res();
						else rej(new Error("User does not exist"));
					}
				}
			);
		});
	};

	getUserById = (userId: string): Promise<User> => {
		return new Promise((res, rej) => {
			this._con.query(
				"CALL `renttracking`.`get_user`(?);",
				[userId],
				(err, results, fields) => {
					if (err) {
						rej(err);
					} else {
						console.log(results);
						results[0][0]
							? res({
									...results[0][0],
									userId: results[0][0].user_id,
									userType: results[0][0].user_type,
							  })
							: rej(new Error("User does not exist"));
					}
				}
			);
		});
	};

	getCredentialsByUsername = (username: string): Promise<Credentials> => {
		return new Promise((res, rej) => {
			this._con.query(
				"CALL `renttracking`.`get_credentials_by_username`(?);",
				[username],
				(err, results, fields) => {
					if (err) {
						rej(err);
					} else {
						if (results[0][0]) {
							const { user_id, username, email, password } =
								results[0][0];
							const credentials: Credentials = {
								userId: user_id,
								username,
								email,
								password,
							};
							res(credentials);
						} else {
							rej(new Error("User does not exist"));
						}
					}
				}
			);
		});
	};
	getCredentialsByEmail = (email: string): Promise<Credentials> => {
		return new Promise((res, rej) => {
			this._con.query(
				"CALL `renttracking`.`get_credentials_by_email`(?);",
				[email],
				(err, results, fields) => {
					if (err) {
						rej(err);
					} else {
						console.log(results);
						if (results[0][0]) {
							const { user_id, username, email, password } =
								results[0][0];
							const credentials: Credentials = {
								userId: user_id,
								username,
								email,
								password,
							};
							res(credentials);
						} else {
							rej(new Error("User does not exist"));
						}
					}
				}
			);
		});
	};
}

export const userMySQLDb = new UserMySQLDb(conn);
