const express = require("express");

const server = express();

server.use(express.json());

let calls = 0;
server.use((req, res, next) => {
  console.log(`Chamadas feitas até então: ${++calls}`);
  next();
});

server.use(require("./src/routes"));

server.listen(3000);
