const productModel = require("../model/product.model");

exports.addProduct = async (req, res) => {
  const product = new productModel(req.body);
  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );

  try {
    await product.save();
    res.status(201).json({ msg: `Product Added Successfully`, product });
  } catch (error) {
    res.status(404).json({ msg: `Error occurred in adding product ${error}` });
  }
};
