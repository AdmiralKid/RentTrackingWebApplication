const { Router } = require("express");
const express = require("express");
const tenantrouter = express.Router();
const mySqlConnection = require("../connection");
tenantrouter.get("/", (req, res)=>
{
    const queryString = "CALL TenantGetAll()";
    mySqlConnection.query(queryString, (err, result, fields)=>
    {
        if(!err)
        {
            res.send(result[0]);
        }
        else
        {
            console.log(err)
        }
    })
})

module.exports = tenantrouter;