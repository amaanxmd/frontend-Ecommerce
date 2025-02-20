import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name:"cardSlice",
    initialState:{
        card:[]
    },
    reducers:{
        addCards:(state,action)=>{
           state.card=action.payload
        }
    }
})

 export const {addCards}=cardSlice.actions;
 export default cardSlice.reducer
