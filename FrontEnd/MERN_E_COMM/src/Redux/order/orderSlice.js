import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addOrderData } from "./orderAPI"

export const initialState = {
   status: "idle", 
   orders: [],
}

export const addOrderDataAsync = createAsyncThunk(
    "order/addOrderData",
    async (data) =>{
        const response = await addOrderData(data)
        return response.data
    },
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},

    extraReducers: (builder)=>{
        builder.addCase(addOrderDataAsync.pending, (state) => {
            state.status = "loading";
        })

        builder.addCase(addOrderDataAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.orders.push(action.payload);
        })
    }
})

export default orderSlice.reducer