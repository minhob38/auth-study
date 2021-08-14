export {};

const Router = require("@koa/router");
const { getSignUp, postSignUp, getSignIn, postSignIn } = require("./controllers/auth");
const router = new Router();

router.get("/auth/sign-up", getSignUp);
router.post("/auth/sign-up", postSignUp);

router.get("/auth/sign-in", getSignIn);
router.post("/auth/sign-in", postSignIn);

module.exports = router;
