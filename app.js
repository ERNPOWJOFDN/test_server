const express = require("express");
const routes = require("./routes");

// App
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/", routes);

module.exports = app;
