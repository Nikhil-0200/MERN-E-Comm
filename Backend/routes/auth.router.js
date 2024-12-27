const express = require("express");
const { createUser, loginUser } = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", createUser).post("/login", loginUser)

module.exports = authRouter;