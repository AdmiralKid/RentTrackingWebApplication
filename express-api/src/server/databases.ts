import { IUserDb } from "../database/user-database/interface";

/**
 * Add your database interface here
 * 
 * Go to /src/index.js to instantiate your database and pass it to the server
 */

export interface Databases {
	userDb: IUserDb;
}
