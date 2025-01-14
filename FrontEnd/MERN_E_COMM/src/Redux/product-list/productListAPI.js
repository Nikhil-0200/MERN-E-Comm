import axios from "axios";

// Function to get the access token from localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Function to get the headers for API requests, attaching the access token if available
const getAuthHeaders = () => {
  const token = getAccessToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Fetch All Products
export async function fetchAllProducts() {
  try {
    let res = await axios({
      url: "https://mern-e-comm-6bh8.onrender.com/products",
      method: "get",
      headers: getAuthHeaders(),  // Attach the access token here
    });

    return res;
  } catch (error) {
    throw new Error(`Error fetching all products: ${error}`);
  }
}

// Fetch Filtered Products based on query
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
      url: `https://mern-e-comm-6bh8.onrender.com/products?${queryString}`,
      method: "get",
      headers: getAuthHeaders(),  // Attach the access token here
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
      url: "https://mern-e-comm-6bh8.onrender.com/category",
      method: "get",
      headers: getAuthHeaders(),  // Attach the access token here
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
      url: "https://mern-e-comm-6bh8.onrender.com/brands",
      method: "get",
      headers: getAuthHeaders(),  // Attach the access token here
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching brands: ${error}`);
  }
}

// Fetching a Single Product by ID
export async function fetchSelectedProduct(id) {
  try {
    let res = await axios({
      url: `https://mern-e-comm-6bh8.onrender.com/products/${id}`,
      method: "get",
      headers: getAuthHeaders(),  // Attach the access token here
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching product by ID: ${error}`);
  }
}

// Create a new Product
export async function createProduct(product) {
  try {
    let res = await axios({
      url: "https://mern-e-comm-6bh8.onrender.com/products",
      method: "post",
      data: product,
      headers: getAuthHeaders(),  // Attach the access token here
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create product: ${error}`);
  }
}

// Update an Existing Product
export async function updateProduct(update) {
  try {
    let res = await axios({
      url: `https://mern-e-comm-6bh8.onrender.com/products/${update.id}`,
      method: "patch",
      data: update,
      headers: getAuthHeaders(),  // Attach the access token here
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error updating product: ${error}`);
  }
}
