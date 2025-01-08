const blacklistedToken = require("../blacklist");
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) =>{
    // const accessToken = req.cookies.accessToken;
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2QzMWE3ZmNmZDNmYjc4ZDlmNTIyNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNjM0NzYwMCwiZXhwIjoxNzM2NDM0MDAwfQ.70JZGCMbmdj9Dik9hiupAtAPSW8Fd74Hz9WAnAxbFx8";

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