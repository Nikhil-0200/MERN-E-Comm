const express = require("express");
const productModel = require("../model/product.model");

const productRouter = express.Router();

productRouter.post("/addProduct", async (req, res) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
    deleted,
  } = req.body;

  try {
    const addProduct = new productModel({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
      deleted,
    });

    await addProduct.save();
    res.status(201).json({ msg: `Product Added Successfully`, addProduct });
  } catch (error) {
    res.status(404).json({ msg: `Error occurred in adding product ${error}` });
  }
});


module.exports = productRouter;
      