import { configureStore } from "@reduxjs/toolkit"
import wishlistSlice from "./Slices/wishlistSlice"
import cartSlice from "./Slices/cartSlice"
import productSlice from "./slices/productSlice"


const cartStore = configureStore({
    reducer:{
       productSlice,
       wishlistSlice,
       cartReducer:cartSlice
    }
})
export default cartStore