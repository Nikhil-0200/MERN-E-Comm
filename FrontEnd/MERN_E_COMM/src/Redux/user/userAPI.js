import axios from "axios"

export async function fetchLoggedInUserOrder(userId){
    try {
        let res = await axios({
            url: `http://localhost:8080/orders/user/${userId}`,
            method: "get"  
        })
        return res
    } catch (error) {
        throw new Error(`Failed to fetch order data: ${error}`)
    }
} 

export async function fetchLoggedInUser(userId){
    try {
        let res = await axios({
            url: `http://localhost:8080/users/${userId}`,
            method: "get"  
        })
        return res
    } catch (error) {
        throw new Error(`Failed to fetch order data: ${error}`)
    }
} 


export async function updateUser(update){
    try {
        let res = await axios({
            url: `http://localhost:8080/users/${update.id}`,
            method: "patch",
            data: update
        })
        return res.data
    } catch (error) {
        throw new Error(`Failed to update address`)
    }
}