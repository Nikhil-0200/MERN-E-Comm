import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../src/Redux/product-list/productListSlice"
import authReducer from "../src/Redux/auth/authSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer
  },
})