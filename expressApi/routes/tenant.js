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
    const queryString = "CALL TenantAssignFlat(?,?)";
    mySqlConnection.query(queryString, [req.body.tenantid,req.body.flatid], (err, result, fields)=>
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

tenantrouter.post("/addtenant/", (req, res)=>
{
    const queryString = "CALL TenantCreate(?,?,?,?,?,?,?,?)";
    console.log(queryString)
    mySqlConnection.query(queryString,[req.body.tenant.tenantname,req.body.tenant.tenantaddress,req.body.tenant.tenantmobilenumber,0,"2020-12-27",null,14000,null], (err, result, fields)=>
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