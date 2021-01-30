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
tenantrouter.post("/assigntenant/", (req, res)=>
{
    const queryString = "update tenant set flatid = "+req.body.flatid+" where tenantid = "+req.body.tenantid;
    mySqlConnection.query(queryString, (err, result, fields)=>
    {
        if(!err)
        {
            res.send("Success");
        }
        else
        {
            res.send("Error");
        }
    })
})
module.exports = tenantrouter;