import con from "../dbconnection";
import { IUserAuth, IUserDetails, IUser } from "../interfaces";

class UserDB {
	async AuthenticateUserCredentials(
		userName: string,
		password: string
	): Promise<IUserAuth | null> {
		const queryString = "CALL AuthenticateUserCredentials(?,?);";
		let user: IUserAuth | null = null;
		return new Promise((res, rej) => {
			con.query(queryString, [userName, password], (error, results, fields) => {
				if (results?.[0][0] && !error) {
					user = <IUserAuth>results[0][0];
				} else if (error) {
					rej(error);
				}
				res(user);
			});
		});
	}

	async InsertUserCredentials(
		userName: string,
		userPassword: string
	): Promise<Boolean> {
		const queryString = "CALL InsertUserCredentials(?,?);";
		return new Promise((res, rej) => {
			con.query(
				queryString,
				[userName, userPassword],
				(error, results, fields) => {
					const isInserted = results[0][0].state as Boolean; // is either 0/1 not true/false
					if (error) {
						rej(error);
					}
					res(isInserted);
				}
			);
		});
	}

	async DeleteUser(userId: number): Promise<Boolean> {
		const query = "CALL DeleteUserSoft(?)";
		return new Promise((res, rej) => {
			try {
				con.query(query, [userId], (error, results, fields) => {
					const isDeleted = results[0][0].state as Boolean; // is either 0/1 not true/false
					console.log(results);
					if (error) {
						rej(error);
					}
					res(isDeleted);
				});
			} catch (err) {
				rej(err);
			}
		});
	}

	// Returns -1 if not successfully created
	async InsertUser(user: IUser): Promise<number> {
		console.log(user);
		const query = "CALL InsertUser(?,?,?,?,?,?)";
		const { userAuth, userDetails } = user;
		const { userName, userPassword } = userAuth;
		const { firstName, lastName, emailId, mobileNo } = userDetails;
		return new Promise((res, rej) => {
			try {
				con.query(
					query,
					[userName, userPassword, firstName, lastName, emailId, mobileNo],
					(error, results, fields) => {
						console.log(results);
						const userId = results[0][0].state as number;
						console.log(results);
						if (error) {
							rej(error);
						}
						res(userId);
					}
				);
			} catch (err) {
				rej(err);
			}
		});
	}
	async UpdateUser(userDetails: IUserDetails): Promise<void> {
		const query = "CALL UpdateUser(?,?,?,?,?)";
		const { userId, firstName, lastName, emailId, mobileNo } = userDetails;
		return new Promise((res, rej) => {
			con.query(
				query,
				[userId, firstName, lastName, emailId, mobileNo],
				(error, results, fields) => {
					if (error) {
						rej(error);
					} else {
						res();
					}
				}
			);
		});
	}
	async GetUserDetails(userId: number): Promise<IUserDetails | null> {
		const query = "CALL GetUserDetails(?)";
		return new Promise((res, rej) => {
			con.query(query, [userId], (error, results, fields) => {
				if (error) {
					rej(error);
				}
				if (results?.[0]?.[0]) {
					res(results[0][0] as IUserDetails);
				} else {
					res(null);
				}
			});
		});
	}
}

export const userDb = new UserDB();
