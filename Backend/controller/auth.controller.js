const userModel = require("../model/user.model")

exports.createUser = async(req, res)=>{
    
    const user = new userModel(req.body);

    try {
        await user.save();
        res.status(201).json(user);        
    } catch (error) {
        res.status(404).json({msg: `Error occurred while creating user ${error}`})
    }
}

exports.loginUser = async(req, res)=>{

    try {
        const user = await userModel.findOne({email: req.body.email}).exec();
        // TO DO: this is temporary have to create a strong auth.

        if(!user){
            res.status(401).json({msg: `No such user email found`})
        }else if(user.password == req.body.password){
            // TO DO: WE WILL MAKE ADDRESSES INDEPENDENT OF LOGIN.
            res.status(200).json({id: user.id, email: user.email, name: user.name, role: user.role});
        }
        else{
            res.status(401).json({msg: `Invalid Credentials`});
        }

    } catch (error) {
        res.status(400).json({msg: `Error occurred while login user ${error}`})
    }

}