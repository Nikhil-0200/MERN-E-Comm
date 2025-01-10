import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginUser, createUser, logout, checkUser, resetPassword} from "./authAPI"

export const initialState = {
    loggedIn: null, // Will be used only for user ID and Auth
    status: "idle",
    error: null,
    userChecked: false,
    mailSent: false
}

export const createUserAsync = createAsyncThunk(
    "user/createUser",
    async (data)=>{
        const response = await createUser(data);
        return response;
    }
);

// loggedInUserToken

export const loginUserAsync = createAsyncThunk(
    "user/loginUser",
    async (loginInfo)=>{
        const response = await loginUser(loginInfo);
        return response
    } 
)

export const checkUserAsync = createAsyncThunk(
    "user/checkUser",
    async ()=>{
        const response = await checkUser();
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

export const resetPasswordAsync = createAsyncThunk(
    "user/resetPassword",
    async (email)=>{
        const response = await resetPassword(email);
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

        builder.addCase(loginUserAsync.pending, (state)=>{
            state.status= "loading";
        })

        builder.addCase(loginUserAsync.fulfilled, (state, action)=>{
            state.status= "idle";
            state.loggedIn= action.payload;
        })

        builder.addCase(loginUserAsync.rejected, (state,action)=>{
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
        })

        builder.addCase(checkUserAsync.pending, (state)=>{
            state.status= "loading";
        })

        builder.addCase(checkUserAsync.fulfilled, (state, action)=>{
            state.status= "idle";
            state.loggedIn= action.payload;
            state.userChecked = true;
        })

        builder.addCase(checkUserAsync.rejected, (state,action)=>{
            state.status= "idle";
            state.error = action.error;
            state.userChecked = true;
        })

        builder.addCase(resetPasswordAsync.pending, (state)=>{
            state.status= "loading";
        })

        builder.addCase(resetPasswordAsync.fulfilled, (state, action)=>{
            state.status= "idle";
            state.mailSent= true;
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