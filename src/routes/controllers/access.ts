const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAccess = (ctx, next) => ctx.render("access");

exports.postAccess = (ctx, next) => {
  const { authorization } = ctx.header;
  let bearerToken;

  if (authorization) {
    bearerToken = authorization.split(" ")[1];
  } else {
    ctx.type = "application/json";
    ctx.status = 401;
    return (ctx.body = {
      message: "토큰이 없습니다.",
      status: "error",
    });
  }

  jwt.verify(bearerToken, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      ctx.type = "application/json";
      ctx.status = 401;
      return (ctx.body = {
        message: "미인증 접근입니다.",
        status: "error",
      });
    } else {
      ctx.type = "application/json";
      ctx.status = 200;
      return (ctx.body = {
        message: "인증된 접근입니다.",
        status: "success",
      });
    }
  });
};

// To Do ... cookie 토큰 인증
