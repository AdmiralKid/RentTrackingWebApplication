import mysql from "mysql";
import { dbconf } from "../config/mysql.config";

export const conn = mysql.createConnection(dbconf);
conn.connect((err) => {
	if (err) console.error(err);
});
