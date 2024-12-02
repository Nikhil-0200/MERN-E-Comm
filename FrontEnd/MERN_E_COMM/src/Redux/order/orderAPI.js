import axios from "axios";

export async function addOrderData(data){
    try {
        let res = await axios({
            url: "http://localhost:3000/orders",
            method: "post",
            data: data
        })
        return res
    } catch (error) {
        throw new Error(`Failed to add item to order: ${error}`)
    }
}