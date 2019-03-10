const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

const port = 5000;
server.listen(port, () => {
  console.log(`------Listening on port ${port}!--------`);
});

module.exports = server;
