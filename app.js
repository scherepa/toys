const express = require('express');
const path = require('path');
const http = require('http');

const {routerInit} = require("./routes/config_routes");

const mongodb = require("./db/mongoConnect");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

routerInit(app);

const server = http.createServer(app);

let port = process.env.PORT || "3000";
console.log(`server is listnning to the lochalhost:${port}`);
server.listen(port);

