const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const connection = require("./config/db.js");
const productRouter = require("./routes/product.route.js");
const categoryRouter = require("./routes/category.route.js");
const brandRouter = require("./routes/brand.route.js");
const authRouter = require("./routes/auth.router.js");

const cors = require("cors");
const userRouter = require("./routes/user.router.js");

server.use(cors({
    exposedHeaders: ["x-total-count"]
}))
server.use(express.json());
server.use("/products", productRouter)
server.use("/category", categoryRouter)
server.use("/brands", brandRouter)
server.use("/auth", authRouter)
server.use("/users", userRouter)

server.get("/", (req, res)=>{
    res.send(`Server is running`);
});

server.listen(PORT, async()=>{
    try {
        await connection;
        console.log(`Server is running at PORT ${PORT}`)
    } catch (error) {
        console.log(`Error occurred while running server`);
    }
})
