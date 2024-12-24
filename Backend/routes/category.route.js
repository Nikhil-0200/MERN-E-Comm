const express = require("express");
const { addCategory, fetchCategory } = require("../controller/category.controller");

const categoryRouter = express.Router();

categoryRouter.post("/addCategory", addCategory).get("/fetchCategory", fetchCategory);

module.exports = categoryRouter;