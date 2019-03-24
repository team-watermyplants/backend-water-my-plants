require("dotenv").config();

const server = require("./server.js");
const PORT = process.env.PORT || 8001;

server.get('/', (req, res) => {
  res.status(200).send('👨‍🔬 All systems nominal! 💃')
})
server.listen(PORT, () => {
  console.log(`\n Server Listens and Obeys on PORT: ${PORT}`);
});
