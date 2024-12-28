const express = require("express");
const { addToCart, fetchCartByUser, deleteItems } = require("../controller/cart.controller");

const cartRouter = express.Router();

cartRouter.post("/", addToCart).get("/:id", fetchCartByUser).delete("/:id", deleteItems);

module.exports = cartRouter;