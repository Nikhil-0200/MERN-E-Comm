const express = require("express");
const { addProduct, fetchAllProducts } = require("../controller/product.controller");

const productRouter = express.Router();

productRouter.post("/addProduct", addProduct).get("/fetchProduct", fetchAllProducts)

module.exports = productRouter; 