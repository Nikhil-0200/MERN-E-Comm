const orderModel = require("../model/order.model");
const userModel = require("../model/user.model");
const { sendMail, invoiceTemplate } = require("../services/common");

exports.addOrderData = async (req, res) => {
  const orderData = new orderModel(req.body);

  try {
    const user = await userModel.findById(orderData.user);
    await orderData.save();

    await sendMail({
      to: user.email,
      subject: "Order Placed Successfully",
      html: invoiceTemplate(orderData),
    })

    res.status(201).json(orderData);
  } catch (error) {
    res
      .status(400)
      .json({ msg: `Error occurred while adding item to the cart ${error}` });
  }
};

exports.fetchLoggedInUserOrder = async (req, res) => {
  const userId = req.body.userId;

  try {
    const orderDetails = await orderModel.find({user: userId });
    res.status(200).json(orderDetails);
  } catch (error) {
    res
      .status(404)
      .json({
        msg: `Error occurred while fetching logged in user order details ${error}`,
      });
  }
};

exports.fetchAllOrders = async (req, res) => {
  let query =  orderModel.find();
  let totalOrdersQuery =  orderModel.find();

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalOrdersQuery = totalOrdersQuery.find({ category: req.query.category });
  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalOrdersQuery = totalOrdersQuery.find({ brand: req.query.brand });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalOrders = await totalOrdersQuery.countDocuments().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = parseInt(req.query._limit, 10);
    const page = parseInt(req.query._page);
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("x-total-count", totalOrders);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json({ msg: `Error occurred in finding orders ${error}` });
  }
};

exports.updateOrders = async (req, res)=>{
    
    let {id} = req.params;

    try {
        let orderData = await orderModel.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(orderData);
    } catch (error) {
        res.status(400).json(`Error occurred while updating order status {error}`)
    }
}
