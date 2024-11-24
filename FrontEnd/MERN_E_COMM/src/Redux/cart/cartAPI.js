import axios from "axios";

export async function addToCart(item){
    try {
        let res = await axios({
            url:"http://localhost:3000/cart",
            method: "post",
            data: item
        })
        return res.data
    } catch (error) {
        throw new Error(`Failed to add item to cart: ${error}`)
    }
}

export async function fetchItemByUserId(userId){
    try {
        let res = await axios({
            url: `http://localhost:3000/cart?user=${userId}`,
            method: "get"
        })
        return res.data
    } catch (error) {
        throw new Error(`Failed to fetch item from cart: ${error}`)
    }
}