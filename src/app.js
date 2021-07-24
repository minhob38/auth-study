const Koa = require("koa");
const Router = require("@koa/router");
const logger = require("koa-logger");
const http = require("http");

const app = new Koa();
const router = new Router();

const server = http.createServer(app.callback());

const knex = require("./database/knexSetup");

app.use(logger());

router.get("/", (ctx, next) => (ctx.body = "hello world"));

app.use(router.routes());

module.exports = server;
