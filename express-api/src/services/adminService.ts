import { IUserDb } from "../database/user-database/interface";
import { User } from "../models/userModel";
import { Databases } from "../server/databases";

export interface IAdminService {
	getUserRequests(): Promise<User[]>;
	approveUserRequest(userId: string): Promise<void>;
	rejectUserRequest(userId: string): Promise<void>;
}

export class AdminService implements IAdminService {
	private _userDb: IUserDb;
	/**
	 *
	 */
	constructor({}, { userDb }: Databases) {
		this._userDb = userDb;
	}

	getUserRequests = (): Promise<User[]> => {
		return this._userDb.getUserRequests();
	};
	approveUserRequest = (userId: string): Promise<void> => {
		return this._userDb.approveUser(userId);
	};
	rejectUserRequest = (userId: string): Promise<void> => {
		return this._userDb.rejectUser(userId);
	};
}
