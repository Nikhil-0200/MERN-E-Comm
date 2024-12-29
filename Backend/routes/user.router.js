const express = require("express");
const { fetchUser, updateUser } = require("../controller/user.controller");


const userRouter = express.Router();

userRouter.get("/:id", fetchUser).patch("/:id", updateUser);

module.exports = userRouter;