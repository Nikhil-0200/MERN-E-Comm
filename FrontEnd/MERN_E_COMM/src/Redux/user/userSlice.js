import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedInUserOrder } from "./userAPI"

const initialState = {
    status: "idle",
    order: [],
}

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
    "user/fetchLoggedInUserOrder",
    async (userId) => {
        const response = await fetchLoggedInUserOrder(userId)
        return response.data
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchLoggedInUserOrderAsync.pending, (state, action) =>{
            state.status = "loading";
        })

        builder.addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) =>{
            state.status = "idle";
            state.order = action.payload;
        })
    }
})

export default userSlice.reducer