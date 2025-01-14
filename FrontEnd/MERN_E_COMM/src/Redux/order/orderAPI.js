import axios from "axios";

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const getAuthHeaders = () => {
    const token = getAccessToken();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
}

export async function addOrderData(data){
    try {
        let res = await axios({
            url: "https://mern-e-comm-6bh8.onrender.com/orders",
            method: "post",
            data: data,
            headers: getAuthHeaders(),
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
            url: `https://mern-e-comm-6bh8.onrender.com/orders?${queryString}`,
            method: "get",
            headers: getAuthHeaders(),
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
          url: `https://mern-e-comm-6bh8.onrender.com/orders/${OrderData.id}`,
          method: "patch",
          data: {status: OrderData.status},
          headers: getAuthHeaders(),
      })
      return res
  } catch (error) {
      throw new Error(`Failed to add item to order: ${error}`)
  }
}
