export {};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../../database/knexSetup");
require("dotenv").config();

exports.getSignUp = (ctx, next) => ctx.render("auth", { isSignUp: true });

exports.getSignIn = (ctx, next) => ctx.render("auth", { isSignUp: false });

exports.postSignUp = async (ctx, next) => {
  try {
    const { name, email, password } = ctx.request.body;
    const user = await knex("users").select("*").where({ email });

    if (user.length !== 0) {
      ctx.type = "application/json";
      ctx.status = 401;
      return (ctx.body = {
        message: "이미 가입되어 있습니다.",
        status: "error",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await knex("users").insert({ name, email, password: hash });
    ctx.type = "application/json";
    ctx.status = 201;
    return (ctx.body = {
      message: "회원 가입이 되었습니다.",
      status: "success",
    });
  } catch (err) {
    ctx.type = "application/json";
    ctx.status = 500;
    return (ctx.body = {
      message: err.message,
      status: "error",
    });
  }
};

exports.postSignIn = async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await knex("users").select("*").where({ email });

    if (user.length === 0) {
      ctx.type = "application/json";
      ctx.status = 401;
      return (ctx.body = {
        message: "가입되지 않은 회원입니다.",
        status: "error",
      });
    }

    const hash = user[0].password;
    const isPassword = await bcrypt.compareSync(password, hash);

    if (!isPassword) {
      ctx.type = "application/json";
      ctx.status = 401;
      return (ctx.body = {
        message: "올바르지 않은 비밀번호입니다.",
        status: "error",
      });
    }

    const token = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, { expiresIn: 120 });

    ctx.type = "application/json";
    ctx.status = 200;
    return (ctx.body = {
      token,
    });
    // To DO ... cookie 토큰 인증
  } catch (err) {
    ctx.type = "application/json";
    ctx.status = 500;
    return (ctx.body = {
      message: err.message,
      status: "error",
    });
  }
};
