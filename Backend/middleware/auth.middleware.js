const blacklistedToken = require("../blacklist");
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) =>{
    // const accessToken = req.cookies.accessToken;
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2NlMWI0MDdmNWY2MzRhY2JhY2U2ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM2NTQyNzAyLCJleHAiOjE3MzY2MjkxMDJ9.AXIbZxihqRDB76FFk0e-vvWe2NSy1QnIL76IiQLraJE";

    if(blacklistedToken.includes(accessToken)){
        res.status(401).json({msg: "Unauthorized"});
    }

    jwt.verify(accessToken, process.env.JWT_SCERETKEY_1, (err, decoded)=>{
        if(err){
            res.status(401).json({msg: "Unauthorized / Login First"});
        }

        if(decoded){
            req.body.userId = decoded.id;
            req.body.role = decoded.role;
            next();
        }
    });
}

module.exports = authMiddleware;