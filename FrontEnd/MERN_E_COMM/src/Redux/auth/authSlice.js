import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUser } from "./authAPI"

export const initialState = {
    loggedIn: null,
    status: "idle"
}

export const createUserAsync = createAsyncThunk(
    "user/createUser",
    async (data)=>{
        const response = await createUser(data);
        return response;
    }
);

const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(createUserAsync.pending, (state)=>{
            state.status= "loading";
            state.error = null;
        })

        builder.addCase(createUserAsync.fulfilled, (state, action)=>{
            state.status= "idle";
            state.loggedIn = action.payload;
        });
    }
})

export default authSlice.reducer