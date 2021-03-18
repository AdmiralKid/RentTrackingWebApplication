import con from "../dbconnection";
import { IUserAuth, IUserDetails } from "../interfaces";

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
}

const userDb = new UserDB();

export default userDb;
