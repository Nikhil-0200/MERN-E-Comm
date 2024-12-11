import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchAllProducts, fetchAllProductsFilter, fetchBrands, fetchCategory, fetchSelectedProduct, updateProduct } from "./productListAPI";

const initialState = {
  products: [],
  category:[],
  brands:[],
  status: "idle",
  totalItems: 0,
  selectedProduct:null
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);

export const fetchAllProductsFilterAsync = createAsyncThunk(
  "product/fetchAllProductsFilter",
  async (queryData) => {
    const response = await fetchAllProductsFilter(queryData);
    return response;
  }
);    

export const fetchCategoryAsync = createAsyncThunk(
  "category/fetchCategory",
  async () =>{
    const response = await fetchCategory();
    return response.data;
  }
)

export const fetchBrandsAsync = createAsyncThunk(
  "brands/fetchCategory",
  async () =>{
    const response = await fetchBrands();
    return response.data
  }
)

export const fetchSelectedProductAsync = createAsyncThunk(
  "product/fetchSelectedProduct",
  async(id) =>{
    const response = await fetchSelectedProduct(id)
    return response.data
  }
)

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async(product) =>{
    const response = await createProduct(product)
    return response
  } 
)

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async(update)=>{
    const response = await updateProduct(update)
    return response
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        // Add user to the state array
        state.status = "idle";
        state.products = action.payload.products;
      })

      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchAllProductsFilterAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchAllProductsFilterAsync.fulfilled, (state, action) => {
        // Add user to the state array
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })

      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        // Add user to the state array
        state.status = "idle";
        state.category = action.payload;
      })

      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        // Add user to the state array
        state.status = "idle";
        state.brands = action.payload;
      })

      .addCase(fetchSelectedProductAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchSelectedProductAsync.fulfilled, (state, action) => {
        // Add user to the state array
        state.status = "idle";
        state.selectedProduct = action.payload;
      })

      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })

      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedItem = action.payload;
            const index = state.products.findIndex((index)=> index.id == updatedItem.id)
            if(index != -1){
                state.products[index] = updatedItem
            }
      });

  },
});

export const selectAllProducts = (state) => state.product.products;
export default productSlice.reducer;
