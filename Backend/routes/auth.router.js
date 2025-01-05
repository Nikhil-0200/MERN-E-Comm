const express = require("express");
const { createUser, loginUser, checkUser } = require("../controller/auth.controller");
const authRouter = express.Router();

authRouter
  .post("/signup", createUser)
  .post("/login", loginUser)
  .get("/check", checkUser);

module.exports = authRouter;
