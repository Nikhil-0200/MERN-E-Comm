import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrderData, fetchAllOrders, updateOrders } from "./orderAPI";

export const initialState = {
  status: "idle",
  orders: [],
  currentOrder: null,
  totalOrders: 0
};

export const addOrderDataAsync = createAsyncThunk(
  "order/addOrderData",
  async (data) => {
    const response = await addOrderData(data);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async (queryData)=>{
    const response = await fetchAllOrders(queryData);
    return response;
  }
)

export const updateOrdersAsync = createAsyncThunk(
  "order/updateOrders",
  async (OrderData)=>{
    const response = await updateOrders(OrderData);
    return response.data;
  }
)


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
    })

    builder.addCase(fetchAllOrdersAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.orders = action.payload.orders
      state.totalOrders = action.payload.totalOrders
    })

    builder.addCase(updateOrdersAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(updateOrdersAsync.fulfilled, (state, action) => {
      state.status = "idle";
      const updateOrder = action.payload
      const index = state.orders.findIndex((index)=> index.id == updateOrder.id)
      if (index != -1){
        state.orders[index] = updateOrder
      }
    });
  },
});

// Action for resetting order
export const {resetOrder} = orderSlice.actions

export default orderSlice.reducer;
