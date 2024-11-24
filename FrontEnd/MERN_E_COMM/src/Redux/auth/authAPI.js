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

        console.log(`Auth API console date -> ${res.data}`);
        

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