import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slice"
import cardReducer from "./cardSlice";
const appStore = configureStore({
    reducer:{
        cart: cartReducer,
        cardSlice:cardReducer
    }
})

export default appStore;