const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const registerRoute = require("./routes/register/Register");
const loginRoute = require("./routes/login/Login");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/auth/register", registerRoute);
server.use("/auth/login", loginRoute);

module.exports = server;
