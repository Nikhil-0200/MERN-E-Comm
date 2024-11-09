import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {fetchAllProducts, fetchAllProductsFilter} from "./productListAPI";

const initialState = {
    products: [],
    status: "idle"
}
    

export const fetchAllProductsAsync = createAsyncThunk(
    "product/fetchAllProducts", 
    async () =>{
        const response = await fetchAllProducts();
        return response.data
    }
)

export const fetchAllProductsFilterAsync = createAsyncThunk(
    "product/fetchAllProductsFilter", 
    async (filter) =>{
        const response = await fetchAllProductsFilter(filter);
        return response.data
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{},

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder

        .addCase(fetchAllProductsAsync.pending, (state)=>{
            state.status = "loading";
            state.error = null;
        })

        .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
          // Add user to the state array
          state.status = "idle";
          state.products = action.payload 
        })

        .addCase(fetchAllProductsAsync.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message
        })

        .addCase(fetchAllProductsFilterAsync.pending, (state)=>{
            state.status = "loading";
            state.error = null;
        })

        .addCase(fetchAllProductsFilterAsync.fulfilled, (state, action) => {
          // Add user to the state array
          state.status = "idle";
          state.products = action.payload 
        })

      },


})

export const selectAllProducts = (state) => state.product.products; 
export default productSlice.reducer;
