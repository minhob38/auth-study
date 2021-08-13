export {};

const bcrypt = require("bcrypt");
const knex = require("../../database/knexSetup");

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
    // const isPassword = bcrypt.compareSync(password, hash);
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
      status: "success",
    });
  }
};

exports.postSignIn = (ctx, next) => ctx.render("home");
