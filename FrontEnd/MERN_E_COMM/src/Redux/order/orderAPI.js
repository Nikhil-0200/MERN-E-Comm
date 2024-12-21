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

export async function fetchAllOrders(queryData){
    let queryString = "";

    for(let key in queryData){

        if(Array.isArray(queryData[key])){
          queryData[key].map((ele)=>{
            queryString += `${key}=${ele}&`
          })
        }
        else{
          queryString += `${key}=${queryData[key]}&`
        }
    
      }

    try {
        let res = await axios({
            url: `http://localhost:3000/orders?${queryString}`,
            method: "get"
        })
        const orders = res.data;
        const totalOrders = parseInt(res.headers['x-total-count'], 10) || 0;

        return {orders, totalOrders};
    } catch (error) {
     throw new Error(`Failed to fetch order details, ${error}`)   
    }
}

export async function updateOrders(OrderData){
  try {
      let res = await axios({
          url: `http://localhost:3000/orders/${OrderData.id}`,
          method: "patch",
          data: OrderData
      })
      return res
  } catch (error) {
      throw new Error(`Failed to add item to order: ${error}`)
  }
}
