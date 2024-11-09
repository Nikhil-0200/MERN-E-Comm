import axios from "axios";

export async function fetchAllProducts(){
    let res = await axios({
        url: "http://localhost:3000/products",
        method: "get"
    })

    return res
}

export async function fetchAllProductsFilter(filter){

    // Filter Para - Obj - {category:beauty}
    let queryString = "";
    for(let key in filter){
        queryString += `${key}=${filter[key]}&`
    }

    let res = await axios({
        url: `http://localhost:3000/products?${queryString}`,
        method: "get"
    })

    return res
}
