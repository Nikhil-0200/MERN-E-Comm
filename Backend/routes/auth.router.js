const express = require("express");
const { createUser, loginUser, checkUser } = require("../controller/auth.controller");
const passport = require("passport");

const authRouter = express.Router();

authRouter
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkUser);

module.exports = authRouter;
