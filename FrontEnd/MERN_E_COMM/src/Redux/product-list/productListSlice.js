import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchAllProductsFilter } from "./productListAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0
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
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export default productSlice.reducer;
