const Koa = require("koa");
const Router = require("@koa/router");
const logger = require("koa-logger");
const http = require("http");
const Pug = require("koa-pug");
const path = require("path");

const app = new Koa();
const router = new Router();
const pug = new Pug({
  viewPath: path.join(__dirname, "/views"),
  app: app,
});

const server = http.createServer(app.callback());

// const knex = require("./database/knexSetup");

app.use(logger());

router.get("/", (ctx, next) => ctx.render("home"));

app.use(router.routes());

module.exports = server;
