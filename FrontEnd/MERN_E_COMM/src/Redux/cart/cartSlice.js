import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToCart, fetchItemByUserId } from "./cartAPI"

export const initialState = {
    status: "idle",
    items:[],
}

export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async (item) =>{
        const response = await addToCart(item)
        return response
    }
)

export const fetchItemByUserIdAsync = createAsyncThunk(
    "cart/fetchItemByUserId",
    async (userId) =>{
        const response = await fetchItemByUserId(userId)
        return response
    }
)

const cartSlice = createSlice({
    name:"cart",
    initialState, 
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(addToCartAsync.pending, (state)=>{
            state.status = "loading";
        })

        builder.addCase(addToCartAsync.fulfilled, (state, action)=>{
            state.status = "idle";
            state.items.push(action.payload);
        })

        builder.addCase(fetchItemByUserIdAsync.pending, (state)=>{
            state.status = "loading";
        })

        builder.addCase(fetchItemByUserIdAsync.fulfilled, (state, action)=>{
            state.status = "idle";
            state.items = action.payload;
        });
    }
})

export default cartSlice.reducer