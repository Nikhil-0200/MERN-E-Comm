const express = require("express");
const {
  addToCart,
  fetchCartByUser,
  deleteItems,
  updateItems,
} = require("../controller/cart.controller");

const cartRouter = express.Router();

cartRouter
  .post("/", addToCart)
  .get("/", fetchCartByUser)
  .delete("/:id", deleteItems)
  .patch("/:id", updateItems);

module.exports = cartRouter;
