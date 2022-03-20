import { ConnectionConfig } from "mysql";

export const dbconf: ConnectionConfig = {
	host: process.env["DB_HOST"],
	user: process.env["DB_USER"],
	password: process.env["DB_PASS"],
	database: process.env["DB"],
};
