const path = require("path");
const Koa = require("koa");
const Router = require("@koa/router");
const logger = require("koa-logger");
const Pug = require("koa-pug");
const serve = require("koa-static");
const http = require("http");

const app: Koa = new Koa();
const router = new Router();
const pug = new Pug({
  viewPath: path.join(__dirname, "/views"),
  app: app,
});
console.log(path.join(__dirname, "/views"))

const server = http.createServer(app.callback());

// const knex = require("./database/knexSetup");

app.use(logger());

app.use(serve(path.join(__dirname, "/public/stylesheets")));

router.get("/", (ctx, next) => ctx.render("home"));
router.get("/sign-up", (ctx, next) => ctx.render("auth", { isSignUp: true }));
router.get("/sign-in", (ctx, next) => ctx.render("auth", { isSignUp: false }));

app.use(router.routes());

module.exports = server;
