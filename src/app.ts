export {};

const path = require("path");
const Koa = require("koa");
const Router = require("@koa/router");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const Pug = require("koa-pug");
const serve = require("koa-static");
const http = require("http");
const authRouter = require("./routes/auth");

const app = new Koa();
const router = new Router();
const pug = new Pug({
  viewPath: path.join(__dirname, "/views"),
  app: app,
});

const server = http.createServer(app.callback());

app.use(logger());

app.use(serve(path.join(__dirname, "/public")));

app.use(bodyparser());

app.use(authRouter.routes());

module.exports = server;
