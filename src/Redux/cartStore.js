import { configureStore } from "@reduxjs/toolkit"
import wishlistSlice from "./Slices/wishlistSlice"
import cartSlice from "./Slices/cartSlice"
import productSlice from "./Slices/productSlice"


const cartStore = configureStore({
    reducer:{
       productSlice,
       wishlistSlice,
       cartReducer:cartSlice
    }
})
export default cartStore