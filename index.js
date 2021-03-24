const server = require("./api/server");
require("dotenv").config();

const PORT = process.env.NODE_ENV || 5555;

server.listen(PORT, () => {
  console.log(`*** Server listening on ${PORT} ***`);
});
