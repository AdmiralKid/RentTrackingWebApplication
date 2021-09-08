import { Connection } from "mysql";

import { UserType, User, Credentials } from "../../../models/userModel";
import { conn } from "../../connections/mysql";
import { IUserDb } from "../interface";
import { mysqlMapper, MySQLSchemaMapper } from "./mapper";
import { AffectedRows, CredentialsView, UserTable } from "./schemas";

class UserMySQLDb implements IUserDb {
	/**
	 *
	 */
	constructor(private _con: Connection, private _mapper: MySQLSchemaMapper) {}

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
						const { affected_rows } = results[0][0] as AffectedRows;
						if (affected_rows !== 0) res();
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
						const result = results[0][0] as UserTable;
						if (result) {
							const user = this._mapper.getUserFromTable(result);
							res(user);
						} else {
							rej(new Error("User does not exist"));
						}
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
						const result = results[0][0] as CredentialsView;
						if (result) {
							const credentials =
								this._mapper.getCredentialsFromView(result);
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
						const result = results[0][0] as CredentialsView;
						if (result) {
							const credentials =
								this._mapper.getCredentialsFromView(result);
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

export const userMySQLDb = new UserMySQLDb(conn, mysqlMapper);
