const express = require("express");
const {
  addProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} = require("../controller/product.controller");

const productRouter = express.Router();

productRouter
  .post("/", addProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct)

module.exports = productRouter;
