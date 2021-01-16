const { Router } = require("express");
const express = require("express");
const flatrouter = express.Router();
const mySqlConnection = require("../connection");

flatrouter.get("/", (req, res)=>
{
    const queryString = "CALL FlatGetAll()";
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

module.exports = flatrouter;