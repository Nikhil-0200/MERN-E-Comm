const brandModel = require("../model/brand.model");

exports.addBrand = async (req, res) => {
  const brand = new brandModel(req.body);

  try {
    await brand.save();
    res.status(201).json({ msg: `brand Added Successfully`, brand });
  } catch (error) {
    res.status(404).json({ msg: `Error occurred in adding brand ${error}` });
  }
};

exports.fetchBrand = async (req, res) => {
  try {
    const brand = await brandModel.find({}).exec();
    res.status(200).json({ msg: `brand Fetched Successfully`, brand });
  } catch (error) {
    res
      .status(400)
      .json({ msg: `Error occurred in finding brand ${error}` });
  }
};
