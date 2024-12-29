const express = require("express");
const { addOrderData, fetchLoggedInUserOrder } = require("../controller/order.controller");

const orderRouter = express.Router();

orderRouter.post("/", addOrderData).get("/", fetchLoggedInUserOrder);

module.exports = orderRouter;