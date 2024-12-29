import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToCart, deleteItems, fetchItemByUserId, resetCart, updateItems } from "./cartAPI"

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

export const updateItemsAsync = createAsyncThunk(
    "cart/updateItems",
    async(update)=>{
        let response = await updateItems(update);  
        return response
    }
) 

export const deleteItemsAsync = createAsyncThunk(
    "cart/deleteItems",
    async(itemId)=>{
        const response = await deleteItems(itemId);
        return itemId
    }
)

export const resetCartAsync = createAsyncThunk(
    "cart/resetCart",
    async(userId)=>{
        const response = await resetCart(userId);
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
        })

        builder.addCase(updateItemsAsync.pending, (state)=>{
            state.status = "loading";
        })

        builder.addCase(updateItemsAsync.fulfilled, (state, action)=>{
            state.status = "idle";
            const updatedItem = action.payload;
            const index = state.items.findIndex((index)=> index.id == updatedItem.id)
            if(index != -1){
                state.items[index] = updatedItem
            }
        });

        builder.addCase(deleteItemsAsync.pending, (state)=>{
            state.status = "loading";
        })

        builder.addCase(deleteItemsAsync.fulfilled, (state, action)=>{
            state.status = "idle";
            const deletedItemId = action.payload;
            state.items = state.items.filter((item)=> item.id != deletedItemId)
        });

        builder.addCase(resetCartAsync.pending, (state)=>{
            state.status = "loading";
        })

        builder.addCase(resetCartAsync.fulfilled, (state, action)=>{
            state.status = "idle";
            state.items = [];
        });
    }
})

export default cartSlice.reducer