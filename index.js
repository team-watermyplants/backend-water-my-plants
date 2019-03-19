require("dotenv").config();

const server = require("./server.js");
const port = process.env.PORT || 4000;

server.get('/', (req, res) => {
  res.status(200).send('all systems nominal')
})
server.listen(port, () => {
  console.log(`------Listening on port ${port}!--------`);
});
