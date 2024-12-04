import axios from "axios"

export async function fetchLoggedInUserOrder(userId){
    try {
        let res = await axios({
            url: `http://localhost:3000/orders/?user.id=${userId}`,
            method: "get"  
        })
        return res
    } catch (error) {
        throw new Error(`Failed to fetch order data: ${error}`)
    }
} 