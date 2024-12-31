const express = require("express");
const { addOrderData, fetchLoggedInUserOrder, fetchAllOrders, updateOrders } = require("../controller/order.controller");

const orderRouter = express.Router();

orderRouter.post("/", addOrderData).get("/user/:userId", fetchLoggedInUserOrder).get("/", fetchAllOrders).patch("/:id", updateOrders);

module.exports = orderRouter;