let config = {
    host : "localhost",
    user : "root",
    password : "password",
    database : "renttracking",
    multipleStatements : true,
	typeCast: function castField( field, useDefaultTypeCasting ) {
		if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
			var bytes = field.buffer();
			return( bytes[ 0 ] === 1 );
		}
		return( useDefaultTypeCasting() );
	}
};
  
module.exports = config;