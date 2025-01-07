import axios from "axios"

export async function fetchLoggedInUserOrder(){
    try {
        let res = await axios({
            url: `http://localhost:8080/orders/own`,
            method: "get"  
        })
        return res
    } catch (error) {
        throw new Error(`Failed to fetch order data: ${error}`)
    }
} 

export async function fetchLoggedInUser(){
    try {
        let res = await axios({
            url: `http://localhost:8080/users`,
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