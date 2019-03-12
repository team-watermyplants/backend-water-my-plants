const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const registerRoute = require("./routes/register/Register");
const loginRoute = require("./routes/login/Login");
const plantsRoute = require("./routes/plants/Plants");
const usersRoute = require("./routes/users/Users");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/auth/register", registerRoute);
server.use("/auth/login", loginRoute);
server.use("/api/plants", plantsRoute);
server.use("/api/users", usersRoute);

module.exports = server;
