var express = require("express");
var path = require("path");
var cors = require("cors");
var serveStatic = require("serve-static");
var request = require("request");
var fs = require("fs");
require("dotenv").config();

app = express();
app.use(cors());
app.use(serveStatic(__dirname + "/build"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

var port = process.env.PORT || 5050;
app.listen(port);
console.log("server started " + port);
