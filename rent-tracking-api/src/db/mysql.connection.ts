import { environment } from "../environments/environment";
import mysql from "mysql";

export const conn = mysql.createConnection({...environment.mysql, dateStrings: true});

conn.connect((err) => {
  if (err) console.error(err);
});
