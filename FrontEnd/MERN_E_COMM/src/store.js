import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../src/Redux/product-list/productListSlice"
import authReducer from "../src/Redux/auth/authSlice"
import cartReducer from '../src/Redux/cart/cartSlice'
import orderReducer from "../src/Redux/order/orderSlice"
import userReducer from "../src/Redux/user/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer
  },
})