import mysql from "mysql";

export const conn = mysql.createConnection({
	host: "localhost",
	user: "renttracking.admin",
	password: "password",
	database: "renttracking",
});

conn.connect();
