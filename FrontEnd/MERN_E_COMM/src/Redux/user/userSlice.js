import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedInUser, fetchLoggedInUserOrder, updateUser } from "./userAPI"

const initialState = {
    userInfo: null, // Will be used for carrying info about the user.
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

export const fetchLoggedInUserAsync = createAsyncThunk(
    "user/fetchLoggedInUser",
    async (userId) => {
        const response = await fetchLoggedInUser(userId)
        return response.data
    }
)


export const updateUserAsync = createAsyncThunk(
    "user/updateUser",
    async (update)=>{
        const response = await updateUser(update);
        return response
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

        builder.addCase(fetchLoggedInUserAsync.pending, (state, action) =>{
            state.status = "loading";
        })

        builder.addCase(fetchLoggedInUserAsync.fulfilled, (state, action) =>{
            state.status = "idle";
            state.userInfo = action.payload;
        })

        builder.addCase(updateUserAsync.pending, (state)=>{
            state.status= "loading";
        })

        builder.addCase(updateUserAsync.fulfilled, (state, action)=>{
            state.status= "idle";
            state.userInfo = action.payload;
        })

        builder.addCase(updateUserAsync.rejected, (state,action)=>{
            state.status= "idle";
            state.error = action.error;
        });
    }
})

export default userSlice.reducer