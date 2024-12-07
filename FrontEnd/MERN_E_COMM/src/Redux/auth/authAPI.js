import { data } from "autoprefixer";
import axios from "axios";
import { Navigate } from "react-router-dom";

export async function createUser(data){
    try {
        let res = await axios({
            url:"http://localhost:3000/users",
            method: "post",
            data: data
        })
        return res.data
    } catch (error) {
        throw new Error(`Failed to create user`)
    }
}

export async function checkUser(loginInfo){
    const email = loginInfo.email;
    const password = loginInfo.password;
    try {
        let res = await axios({
            url: `http://localhost:3000/users?email=${email}`,
            method: "get"
        })

        

        if(res.data.length){
            if(password === res.data[0].password){
                return res.data[0]
            }
            else{
                throw new Error(`Invalid Password`)
            }
        }
        else{
        throw new Error(`User Not Found`)
        }

    } catch (error) {
        throw new Error(error.message || `Invalid Login Credentials`)
    }
}

export async function logout(userId){
    try {
        return `User Logout Successfully`
    } catch (error) {
        throw new Error(`Failed to Logout`)
    }
}

// export async function updateUser(update){
//     try {
//         let res = await axios({
//             url: `http://localhost:3000/users/${update.id}`,
//             method: "patch",
//             data: update
//         })
//         return res.data
//     } catch (error) {
//         throw new Error(`Failed to update address`)
//     }
// }

// We were using updateUser first in Auth but now have moved to userAPI. 