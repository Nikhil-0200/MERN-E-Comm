import { data } from "autoprefixer";
import axios from "axios";
import { Navigate } from "react-router-dom";

export async function createUser(data){
    try {
        let res = await axios({
            url:"http://localhost:8080/auth/signup",
            method: "post",
            data: data
        })
        return res.data
    } catch (error) {
        throw new Error(`Failed to create user`)
    }
}

export async function loginUser(loginInfo){
    
    try {
        let res = await axios({
            url: `http://localhost:8080/auth/login`,
            method: "post",
            data: loginInfo
        })

        
        return res.data

    } catch (error) {
        throw new Error(error.response?.data?.msg || `Invalid Login Credentials`)
        
    }
}

export async function checkUser(){
    
    try {
        let res = await axios({
            url: `http://localhost:8080/auth/check`,
            method: "get",
        })

        
        return res.data

    } catch (error) {
        return error
    }
}

export async function logout(userId){
    try {
        return `User Logout Successfully`
    } catch (error) {
        throw new Error(`Failed to Logout`)
    }
}

export async function resetPassword(email){
    
    try {
        let res = await axios({
            url: `http://localhost:8080/auth/resetPassword`,
            method: "post",
            data: {email: email}
        })

        
        return res.data

    } catch (error) {
        return error
    }
}

// export async function updateUser(update){
//     try {
//         let res = await axios({
//             url: `http://localhost:8080/users/${update.id}`,
//             method: "patch",
//             data: update
//         })
//         return res.data
//     } catch (error) {
//         throw new Error(`Failed to update address`)
//     }
// }

// We were using updateUser first in Auth but now have moved to userAPI. 