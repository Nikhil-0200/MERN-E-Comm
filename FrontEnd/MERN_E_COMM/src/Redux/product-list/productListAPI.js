import axios from "axios";

export async function fetchAllProducts() {
  let res = await axios({
    url: "http://localhost:3000/products",
    method: "get",
  });

  return res;
}

export async function fetchAllProductsFilter(queryData) {

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

  let res = await axios({
    url: `http://localhost:3000/products?${queryString}`,
    method: "get",
  });
 const totalItems = res.headers["x-total-count"];
  
  return {products:res.data, totalItems:totalItems};
}

// Fetching Category Data
export async function fetchCategory(){
  let res = await axios({
    url: "http://localhost:3000/category",
    method: "get"
  })
  console.log(`Api Response`);
  
  return res
}

// Fetching Brands Data
export async function fetchBrands(){
  let res = await axios({
    url: "http://localhost:3000/brands",
    method: "get"
  })
  return res
}

// SelectedProduct

export async function fetchSelectedProduct(id){
  let res = await axios({
    url: `http://localhost:3000/products/${id}`,
    method: "get"
  })
  return res
}