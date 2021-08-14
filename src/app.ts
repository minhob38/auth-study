export {};

const path = require("path");
const Koa = require("koa");
const Router = require("@koa/router");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const Pug = require("koa-pug");
const serve = require("koa-static");
const http = require("http");

const homeRouter = require("./routes/home");
const authRouter = require("./routes/auth");
const accessRouter = require("./routes/access");

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

app.use(homeRouter.routes());
app.use(authRouter.routes());
app.use(accessRouter.routes());

module.exports = server;
