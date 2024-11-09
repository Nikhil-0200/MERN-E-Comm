import axios from "axios";

async function fetchAllProducts(){
    let res = await axios({
        url: "http://localhost:3000/products",
        method: "get"
    })

    return res
}

export default fetchAllProducts;