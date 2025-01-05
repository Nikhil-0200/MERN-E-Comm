import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { checkUser, createUser, logout} from "./authAPI"

export const initialState = {
    loggedIn: null, // Will be used only for user ID and Auth
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

// loggedInUserToken

export const checkUserAsync = createAsyncThunk(
    "user/checkUser",
    async (loginInfo)=>{
        const response = await checkUser(loginInfo);
        return response
    } 
)

export const logoutAsync = createAsyncThunk(
    "user/logout",
    async (loginInfo) =>{
        const response = await logout(loginInfo);
        return response
    }
)

// export const  = createAsyncThunk(
//     "user/updateUser",
//     async (update)=>{
//         const response = await updateUser(update);
//         return response
//     } 
// )

// Have moved this also in userSlice

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
            state.loggedIn= action.payload;
        })

        builder.addCase(checkUserAsync.pending, (state)=>{
            state.status= "loading";
        })

        builder.addCase(checkUserAsync.fulfilled, (state, action)=>{
            state.status= "idle";
            state.loggedIn= action.payload;
        })

        builder.addCase(checkUserAsync.rejected, (state,action)=>{
            state.status= "idle";
            state.error = action.error;
        });

        builder.addCase(logoutAsync.pending, (state)=>{
            state.status= "loading";
        })

        builder.addCase(logoutAsync.fulfilled, (state, action)=>{
            state.status= "idle";
            state.loggedIn= null;
        })

        builder.addCase(logoutAsync.rejected, (state,action)=>{
            state.status= "idle";
            state.error = action.error;
        });

        // builder.addCase(updateUserAsync.pending, (state)=>{
        //     state.status= "loading";
        // })

        // builder.addCase(updateUserAsync.fulfilled, (state, action)=>{
        //     state.status= "idle";
        //     state.loggedInUserToken= action.payload;
        // })

        // builder.addCase(updateUserAsync.rejected, (state,action)=>{
        //     state.status= "idle";
        //     state.error = action.error;
        // });
    }
})

export default authSlice.reducer