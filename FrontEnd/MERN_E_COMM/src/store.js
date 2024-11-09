import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../src/Redux/product-list/productListSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
})