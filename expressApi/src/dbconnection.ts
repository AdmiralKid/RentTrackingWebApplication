import mysql from "mysql";
const config = {
	host: "localhost",
	user: "root",
	password: "password",
	database: "renttrackingdb",
	multipleStatements: true,
	typeCast: function castField(field: any, useDefaultTypeCasting: any) {
		if (
			(field.type === "BIT" || field.type === "TINY") && // converts BOOLEAN from DB to Boolean in TS
			field.length === 1
		) {
			var bytes = field.buffer();
			return bytes[0] === 1;
		}
		return useDefaultTypeCasting();
	},
};

var mySqlConnection = mysql.createConnection(config);

mySqlConnection.connect((err) => {
	if (!err) {
		console.log("Connection success!!");
	} else {
		console.log("Error Connecting to DB");
		console.log(err);
	}
});

export default mySqlConnection;
