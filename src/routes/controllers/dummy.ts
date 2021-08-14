export {};

const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.getDummy = (ctx, next) => {
  console.log(ctx.request.header);

  ctx.body = "hello";
};
