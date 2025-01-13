const blacklistedToken = require("../blacklist");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2QzMWE3ZmNmZDNmYjc4ZDlmNTIyNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNjcyMTE1NCwiZXhwIjoxNzM2ODA3NTU0fQ.Aesn-p5m83_izdPKrNqt05quq_s2eIZb0mCQb-pS1Q0";

  if (blacklistedToken.includes(accessToken)) {
    res.status(401).json({ msg: "Unauthorized" });
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
