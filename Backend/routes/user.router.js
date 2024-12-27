const express = require("express");
const { fetchUser } = require("../controller/user.controller");


const userRouter = express.Router();

userRouter.get("/:id", fetchUser);

module.exports = userRouter;