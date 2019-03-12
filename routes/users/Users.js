const express = require("express");
const router = express.Router();

const auth = require("../../auth/auth");
const db = require("../../data/dbConfig");

router.get("/", auth.authenticate, async (req, res) => {
  let users = await db("users");

  res.status(200).json(users);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    username,
    password,
    phoneNumber,
    profileURL
  } = req.body;

  if (!firstName || !lastName || !username || !password || !phoneNumber) {
    res.status(400).json({ message: "Please fill out all required fields." });
  } else {
    db("users")
      .where({ id: id })
      .update({
        firstName,
        lastName,
        username,
        password,
        phoneNumber,
        profileURL
      })
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "There isn't anything to update with that id."
          });
        }
      })
      .catch(() => res.status(500).json({ message: "server error" }));
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .where({ id: id })
    .del()
    .then(user => {
      if (!user) {
        res.status(400).json({
          message: "There are no users to delete corresponding with that id."
        });
      } else {
        res.status(200).json({ message: "The user was successfully deleted." });
      }
    })
    .catch(() => res.status(500).json({ message: "server error" }));
});

//all notifications for a specific user
//all plants for a specific user nested inside of user.
module.exports = router;
