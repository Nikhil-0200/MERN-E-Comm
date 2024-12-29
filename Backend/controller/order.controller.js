const orderModel = require("../model/order.model")

exports.addOrderData = async (req, res) => {

    const orderData = new orderModel(req.body);

    try {
        await orderData.save();
        res.status(201).json(orderData);
    } catch (error) {
        res.status(400).json({msg: `Error occurred while adding item to the cart ${error}`})
    }
}

exports.fetchLoggedInUserOrder = async (req, res) => {

    const {user} = req.query;

    try {
        const orderDetails = await orderModel.find({user: user})
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(404).json({msg: `Error occurred while fetching logged in user order details ${error}`})
    }
}
