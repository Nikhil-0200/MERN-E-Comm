const categoryModel = require("../model/category.model");

exports.addCategory = async (req, res) => {
  const category = new categoryModel(req.body);

  try {
    await category.save();
    res.status(201).json({ msg: `Category Added Successfully`, category });
  } catch (error) {
    res.status(404).json({ msg: `Error occurred in adding category ${error}` });
  }
};

exports.fetchCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({}).exec();
    res.status(200).json({ msg: `Category Fetched Successfully`, category });
  } catch (error) {
    res
      .status(400)
      .json({ msg: `Error occurred in finding category ${error}` });
  }
};
