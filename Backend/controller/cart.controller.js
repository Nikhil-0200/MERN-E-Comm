const cartModel = require("../model/cart.model")

exports.addToCart = async (req, res) => {
    
    const cartData = new cartModel(req.body);
    
    try {
        const doc = await cartData.save(); 
        await doc.populate("product")
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json({msg:  `Error occurred while adding product to cart`})
    }
}

exports.fetchCartByUser = async(req, res)=>{
    
    const {id} = req.params
    try {
        const cartItems = await cartModel.find({user: id}).populate("product") 
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(400).json({msg: `Error occurred while fetching cart items by user ${error}`})
    }
}

exports.deleteItems = async(req, res)=>{
    
    const {id} = req.params
    try {
        const cartItems = await cartModel.findOneAndDelete({product: id});
        if (!cartItems) {
            return res.status(404).json({ msg: "Item not found" });
        }
        res.status(200).json({ id }); // Return the ID after deletion
    } catch (error) {
        res.status(400).json({msg: `Error occurred while deleting cart items ${error}`})
    }
}

