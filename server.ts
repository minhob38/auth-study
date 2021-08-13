export {};

const server = require("./src/app");

enum CONFIG {
  PORT = 3000
}

server.listen(CONFIG.PORT, () => console.log(`server connection :) ${CONFIG.PORT}`));
