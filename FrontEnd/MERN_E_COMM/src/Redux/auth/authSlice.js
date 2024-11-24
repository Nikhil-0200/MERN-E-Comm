import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { checkUser, createUser } from "./authAPI"

export const initialState = {
    loggedIn: null,
    status: "idle",
    error: null
}

export const createUserAsync = createAsyncThunk(
    "user/createUser",
    async (data)=>{
        const response = await createUser(data);
        return response;
    }
);

export const checkUserAsync = createAsyncThunk(
    "user/checkUser",
    async (loginInfo)=>{
        const response = await checkUser(loginInfo);
        return response
    } 
)

const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(createUserAsync.pending, (state)=>{
            state.status= "loading";
        })

        builder.addCase(createUserAsync.fulfilled, (state, action)=>{
            state.status= "idle";
            state.loggedIn = action.payload;
        })

        builder.addCase(checkUserAsync.pending, (state)=>{
            state.status= "loading";
        })

        builder.addCase(checkUserAsync.fulfilled, (state, action)=>{
            state.status= "idle";
            state.loggedIn = action.payload;
        })

        builder.addCase(checkUserAsync.rejected, (state,action)=>{
            state.status= "idle";
            state.error = action.error;
        });
    }
})

export default authSlice.reducer