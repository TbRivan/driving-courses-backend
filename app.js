const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(2800);

require("./app/helper/autoload");

const dotenv = require("dotenv");
const env = !process.argv[2] ? "" : `.${process.argv[2]}`;
dotenv.config({
  path: `./env/.env${env}`,
});

const mariadb = require("./app/connection/mariadb");
mariadb.createConnection();

const config = require("./app/config");
const port = config.port;
const ip = config.ip;
const pjson = require("./package.json");
const service = pjson.name;
const version = pjson.version;

const cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization,uuid,user_agent,csrf,Broadcast"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// hide x-powered-by: Express
app.disable("x-powered-by");

const routes = require("./app/routes");
require("./app/routes/socketio");

routes(app, io);

server.listen(port, ip, () => {
  console.log(`${service} version ${version} API listening on ${ip}:${port}`);
  console.log(
    `${service} version ${version} Socket Io listening on ${ip}:2800`
  );
});

module.exports = { app, server };
