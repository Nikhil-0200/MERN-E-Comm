const express = require("express");
const { createUser, loginUser, checkUser, resetPasswordRequest, blacklistToken } = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authRouter = express.Router();

authRouter
  .post("/signup", createUser)
  .post("/login", loginUser)
  .get("/check", authMiddleware, checkUser)
  .post("/resetPasswordRequest", resetPasswordRequest)
  .post("/blacklist", blacklistToken);

module.exports = authRouter;
