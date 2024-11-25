import { data } from "autoprefixer";
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
            url: `http://localhost:3000/cart?userId=${userId}`,
            method: "get"
        })
        return res.data
    } catch (error) {
        throw new Error(`Failed to fetch item from cart: ${error}`)
    }
}

export async function updateItems(update){
    try {
        let res = await axios({
            url: `http://localhost:3000/cart/${update.id}`,
            method: "patch",
            data: update
        })
        return res.data
    } catch (error) {
        throw new Error(`Error getting update item in cart: ${error}`)
    }
}

export async function deleteItems(itemId) {
    try {
        let res = await axios({
            url:`http://localhost:3000/cart/${itemId}`,
            method: "delete",
        })
        return itemId;

    } catch (error) {
       throw new Error(`Error occured while deleting item from cart: ${error}`) 
    }
}