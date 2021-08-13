const Router = require("@koa/router");
const { getSignUp, postSignUp, getSignIn, postSignIn } = require("./controllers/auth");
const router = new Router();

router.get("/", postSignIn);
router.get("/auth/sign-up", getSignUp);
router.get("/auth/sign-in", getSignIn);
router.post("/auth/sign-up", postSignUp);

module.exports = router;
