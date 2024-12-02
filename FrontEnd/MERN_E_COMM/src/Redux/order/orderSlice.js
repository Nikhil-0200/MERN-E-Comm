import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrderData } from "./orderAPI";

export const initialState = {
  status: "idle",
  orders: [],
  currentOrder: null,
};

export const addOrderDataAsync = createAsyncThunk(
  "order/addOrderData",
  async (data) => {
    const response = await addOrderData(data);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Directly resetting order as we are managing this currentOrder state here.    
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addOrderDataAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(addOrderDataAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
    });
  },
});

// Action for resetting order
export const {resetOrder} = orderSlice.actions

export default orderSlice.reducer;
