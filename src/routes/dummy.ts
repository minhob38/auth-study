export {};

const Router = require("@koa/router");
const { getDummy } = require("./controllers/dummy");
const router = new Router();

router.get("/dummy", getDummy);

module.exports = router;
