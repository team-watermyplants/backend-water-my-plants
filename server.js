const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const db = require("./data/dbConfig");

const plantsRoute = require("./routes/plants/Plants");
const usersRoute = require("./routes/users/Users");
const notificationsRoute = require("./routes/notifications/Notifications");
const auth = require("./auth/auth");

const smsWorker = require("./twilio/Cron");

const {
  checkLogin,
  findUser,
  checkPassword,
  checkRegistration,
  hashPassword
} = require("./middleware/Middleware");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/plants", plantsRoute);
server.use("/api/users", usersRoute);
server.use("/api/notifications", notificationsRoute);

server.post(
  "/auth/login",
  checkLogin,
  findUser,
  checkPassword,
  async (req, res) => {
    if (req.user) {
      let token = auth.generateToken(req.user);
      res.status(200).json(req.user, token);
    }
  }
);

server.post("/auth/register", checkRegistration, hashPassword, (req, res) => {
  const { firstName, lastName, username, password, phoneNumber } = req.body;
  db("users")
    .insert({ firstName, lastName, username, password, phoneNumber })
    .returning("*")
    .then(user => {
      if (user) {
        let token = auth.generateToken(user);
        res.status(201).json({
          user,
          token
        });
      } else {
        res.status(400).json({ message: "something wrong with user input" });
      }
    })
    .catch(err => res.status(500).json(err));
});

smsWorker.start();

module.exports = server;
