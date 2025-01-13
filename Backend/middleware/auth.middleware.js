const blacklistedToken = require("../blacklist");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader  = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (blacklistedToken.includes(accessToken)) {
    res.status(401).json({ msg: "Unauthorized - Token is blacklisted" });
  }

  jwt.verify(accessToken, process.env.JWT_SCERETKEY_1, (err, decoded) => {
    if (err) {
      const msg =
        err.name === "TokenExpiredError"
          ? "Session expired. Please login again."
          : "Unauthorized - Invalid token.";
      return res.status(401).json({ msg });
    }

    if (decoded) {
      req.body.userId = decoded.id;
      req.body.role = decoded.role;
      next();
    }
  });
};

module.exports = authMiddleware;
