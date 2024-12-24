const express = require("express");
const { addBrand, fetchBrand } = require("../controller/brand.controller");

const brandRouter = express.Router();

brandRouter.post("/addBrand", addBrand).get("/fetchBrand", fetchBrand);

module.exports = brandRouter;