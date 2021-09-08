import { Credentials, User } from "../../../models/userModel";
import { CredentialsView, UserTable } from "./schemas";

export class MySQLSchemaMapper {
	/**
	 *
	 */
	constructor() {}

	getUserFromTable(userTable: UserTable): User {
		const { user_id, username, email, user_type } = userTable;
		const user: User = {
			userId: user_id,
			username,
			email,
			userType: user_type,
		};
		return user;
	}

	getCredentialsFromView(view: CredentialsView): Credentials {
		const { user_id, username, email, password } = view;
		const credentials: Credentials = {
			userId: user_id,
			username,
			email,
			password,
		};
		return credentials;
	}
}

export const mysqlMapper = new MySQLSchemaMapper();
