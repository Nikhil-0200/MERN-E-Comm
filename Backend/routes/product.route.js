const express = require("express");
const productModel = require("../model/product.model");
const { addProduct } = require("../controller/product.controller");

const productRouter = express.Router();

productRouter.post("/addProduct", addProduct)



module.exports = productRouter;
      