const userModel = require("../model/user.model")

// exports.createUser = async(req, res)=>{
    
//     const user = new userModel(req.body);

//     try {
//         await user.save();
//         res.status(201).json(user);        
//     } catch (error) {
//         res.status(404).json({msg: `Error occurred while creating user ${error}`})
//     }
// }

exports.fetchUser = async(req, res)=>{

    const {id} = req.params;

    try {
        const user = await userModel.findById(id);
        res.status(200).json({id: user.id, email: user.email, addresses: user.addresses})

    } catch (error) {
        res.status(400).json({msg: `Error occurred while fetching user ${error}`})
    }

}

exports.updateUser = async(req, res)=>{

    const {id} = req.params;

    try {
        const user = await userModel.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({id: user.id, email: user.email, addresses: user.addresses})
    } catch (error) {
        res.status(400).json({msg: `Error occurred while fetching user ${error}`})
    }

}