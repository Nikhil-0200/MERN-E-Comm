import axios from "axios";

export async function fetchAllProducts() {
  let res = await axios({
    url: "http://localhost:3000/products",
    method: "get",
  });

  return res;
}

export async function fetchAllProductsFilter(filter) {
  // Filter Para - Obj - {category:beauty}
  //Sort Para = Obj = {_sort="price"&_order="desc"}
  let queryString = "";
  for (let key in filter) {
    if (Array.isArray(filter[key])) {
      // Agr Filter[key] ek - array h toh
      filter[key].forEach((ele) => {
        queryString += `${key}=${ele}&`;
      });
    } else {
      queryString += `${key}=${filter[key]}&`;
    }
  }

  let res = await axios({
    url: `http://localhost:3000/products?${queryString}`,
    method: "get",
  });

  return res;
}
