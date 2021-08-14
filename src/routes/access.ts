export {};

const Router = require("@koa/router");
const { getAccess, postAccess } = require("./controllers/access");
const router = new Router();

router.get("/access", getAccess);

router.post("/access", postAccess);

module.exports = router;
