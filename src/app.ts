const path = require("path");
const Koa = require("koa");
const Router = require("@koa/router");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const Pug = require("koa-pug");
const serve = require("koa-static");
const http = require("http");

const app = new Koa();
const router = new Router();
const pug = new Pug({
  viewPath: path.join(__dirname, "/views"),
  app: app,
});

const server = http.createServer(app.callback());

// const knex = require("./database/knexSetup");

app.use(logger());

app.use(serve(path.join(__dirname, "/public")));

app.use(bodyparser());

router.get("/", (ctx, next) => ctx.render("home"));
router.get("/auth/sign-up", (ctx, next) => ctx.render("auth", { isSignUp: true }));
router.get("/auth/sign-in", (ctx, next) => ctx.render("auth", { isSignUp: false }));

router.post("/auth/sign-up", (ctx, next) => {
  ctx.request.ctx.body = "hello";
});

app.use(router.routes());

module.exports = server;
