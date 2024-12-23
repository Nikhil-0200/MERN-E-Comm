const express = require("express");
const server = express();
const PORT = process.env.PORT || 3009;
const connection = require("./config/db.js");
const productRouter = require("./routes/product.route.js");


server.use(express.json());
server.use("/product", productRouter)

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