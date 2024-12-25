const express = require("express");
const { addCategory, fetchCategory } = require("../controller/category.controller");

const categoryRouter = express.Router();

categoryRouter.post("/", addCategory).get("/", fetchCategory);

module.exports = categoryRouter;