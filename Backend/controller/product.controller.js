const productModel = require("../model/product.model");

// ADD PRODUCT (POST)
exports.addProduct = async (req, res) => {
  const product = new productModel(req.body);
  
  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(404).json({ msg: `Error occurred in adding product ${error}` });
  }
};

// FETCH PRODUCT (GET)
exports.fetchAllProducts = async (req,res)=>{
  // Here we need all query strings
  
  // filter = {"category": ["smartphone", "laptops"]}
  // sort = {_sort: "Price", _order: "desc"}
  // pagination = {_page:1, _limit:10}
  
  let query = productModel.find({});
  let totalProductsQuery = productModel.find({});

  if(req.query.category){
    query = query.find({category: req.query.category});
    totalProductsQuery = totalProductsQuery.find({category: req.query.category});
  }

  if(req.query.brand){
    query = query.find({brand: req.query.brand})
    totalProductsQuery = totalProductsQuery.find({brand: req.query.brand});
  }

  if(req.query._sort && req.query._order){
    query = query.sort({[req.query._sort]: req.query._order});
  }
  
  const totalDocs = await totalProductsQuery.countDocuments().exec();



  if(req.query._page && req.query._limit){
    const pageSize = parseInt(req.query._limit, 10);
    const page = parseInt(req.query._page);
    query = query.skip(pageSize*(page-1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set('x-total-count', totalDocs);
    res.status(200).json(docs)
  } catch (error) {
    res.status(400).json({msg: `Error occurred in finding product ${error}` })
  }

}

// FETCH PRODUCT BY ID (SINGLE PRODUCT - [GET])
exports.fetchProductById = async(req, res)=>{
  
  const {id} = req.params;

  try {
    const product = await productModel.findById(id);
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({msg: `Error occurred while fetching product by id ${error}`})
  }
}

// UPDATE PRODUCT (SINGLE PRODUCT - [PATCH])
exports.updateProduct = async(req, res)=>{
  const {id} = req.params;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({msg: `Error occurred while updating product ${error}`}); 
  }
}
