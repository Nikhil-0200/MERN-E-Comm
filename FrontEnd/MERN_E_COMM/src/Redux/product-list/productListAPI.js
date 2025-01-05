import axios from "axios";

export async function fetchAllProducts() {
  let res = await axios({
    url: "http://localhost:8080/products",
    method: "get",
  });

  return res;
}

export async function fetchAllProductsFilter(queryData) {
  let queryString = "";

  for (let key in queryData) {
    if (Array.isArray(queryData[key])) {
      queryData[key].map((ele) => {
        queryString += `${key}=${ele}&`;
      });
    } else {
      queryString += `${key}=${queryData[key]}&`;
    }
  }

  try {
    let res = await axios({
      url: `http://localhost:8080/products?${queryString}`,
      method: "get",
    });
    const totalItems = res.headers["x-total-count"];

    return { products: res.data, totalItems: totalItems };
  } catch (error) {
    throw new Error(`Error fetching filtered products: ${error}`);
  }
}

// Fetching Category Data
export async function fetchCategory() {
  try {
    let res = await axios({
      url: "http://localhost:8080/category",
      method: "get",
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching category: ${error}`);
  }
}

// Fetching Brands Data
export async function fetchBrands() {
  
  try {
    let res = await axios({
      url: "http://localhost:8080/brands",
      method: "get",
    });
    return res;  
  } catch (error) {
    throw new Error(`Error fetching brands: ${error}`);
  }  
}

// SelectedProduct

export async function fetchSelectedProduct(id) {

  try {
    let res = await axios({
      url: `http://localhost:8080/products/${id}`,
      method: "get",
    });
    return res;  
  } catch (error) {
    throw new Error(`Error fetching productByID: ${error}`);
  }
}

export async function createProduct(product) {
  try {
    let res = await axios({
      url: "http://localhost:8080/products",
      method: "post",
      data: product,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create product ${error}`);
  }
}

export async function updateProduct(update) {
  try {
    let res = await axios({
      url: `http://localhost:8080/products/${update.id}`,
      method: "patch",
      data: update,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error getting update item: ${error}`);
  }
}
