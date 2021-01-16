const express = require("express");
const bodyParser = require("body-parser");
const Flat = require("./routes/flat");
const Tenant = require("./routes/tenant");
var app = express();
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

app.use("/flat", Flat);

app.use("/tenant", Tenant);

app.listen(5000);