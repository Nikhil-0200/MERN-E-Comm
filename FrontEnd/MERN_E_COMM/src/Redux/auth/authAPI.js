import { data } from "autoprefixer";
import axios from "axios";

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