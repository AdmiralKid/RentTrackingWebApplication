const mysql = require("mysql");
const config = require('./config.js');
var mySqlConnection = mysql.createConnection(config);

mySqlConnection.connect((err)=>{
    if(!err)
    {
        console.log("Connection success!!");        
    }
    else
    {
        console.log("Error Connecting to DB");
        console.log(err)
    }
})

module.exports = mySqlConnection;