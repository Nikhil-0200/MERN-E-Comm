const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
const connection = require("./config/db.js");
const productRouter = require("./routes/product.route.js");
const categoryRouter = require("./routes/category.route.js");
const brandRouter = require("./routes/brand.route.js");
const authRouter = require("./routes/auth.router.js");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const userRouter = require("./routes/user.router.js");
const cartRouter = require("./routes/cart.router.js");
const orderRouter = require("./routes/order.router.js");
const authMiddleware = require("./middleware/auth.middleware.js");

// Emails




// middleware

server.use(
  cors({
    credentials: true,
    exposedHeaders: ["x-total-count"],
  })
);

server.use(express.json());
server.use(cookieParser());
server.use("/products", authMiddleware, productRouter)
server.use("/category", authMiddleware, categoryRouter)
server.use("/brands", authMiddleware, brandRouter)
server.use("/auth", authRouter)
server.use("/users", authMiddleware, userRouter)
server.use("/cart", authMiddleware, cartRouter)
server.use("/orders", authMiddleware, orderRouter)

server.get("/", (req, res)=>{
  res.send(`Server is running`);
});



server.get("/newAccessToken", (req, res)=>{
  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken){
    return res.status(401).json({ message: "No refresh token provided" });
  }

  jwt.verify(refreshToken, process.env.JWT_SCERETKEY_2, (err, decoded)=>{
    if(err){
      return res.status(403).json({ message: "Invalid refresh token" });
     }

     const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role }, // Payload (modify as per your needs)
      process.env.JWT_SCERETKEY_2,
      { expiresIn: "15m" } // Set the expiration time for the access token
    );

    res.status(200).json({ accessToken: newAccessToken });
  })

})

server.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running at PORT ${PORT}`);
  } catch (error) {
    console.log(`Error occurred while running server`);
  }
});
