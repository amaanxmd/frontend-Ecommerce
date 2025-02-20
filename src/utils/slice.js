import { createSlice } from "@reduxjs/toolkit";


const cartslice = createSlice({
    name :"cart",// cannot use myname or something else should be name only
    initialState:{
        myitems:[],
        count :new Array(50).fill(0),
    },
    reducers:{ // must use only reducers do not wrie anything else will give error at the time of using useDispatch()
        addItem:(mystate,myaction)=>{
            // mystate.myitems.push(myaction.payload.cardInfo)
            // mystate.count[myaction.payload.index]=mystate.count[myaction.payload.index]+1
            if(myaction.payload){
                mystate.myitems.length=myaction.payload.length
                console.log(myaction.payload)
            }else{

                mystate.myitems.push(1)
                console.log(myaction.payload)
            }
        },
        removeItem:(mystate,myaction)=>{
            //  mystate.myitems=[...(mystate.myitems.slice(0,myaction.payload.index)),...(mystate.myitems.slice(myaction.payload.index+1))]
            //  mystate.count[myaction.payload.index]=mystate.count[myaction.payload.index]-1
            mystate.myitems.pop()
        },
        clearCart:(mystate)=>{
              mystate.myitems.length =0
              mystate.count.fill(0)
            //   return {items:[]}  or do this instead of line 17
        },
        manageCount:(mystate,myaction)=>{
            const [[firstKey, firstValue]] = Object.entries(myaction.payload);
        //   console.log(firstKey)
        //   console.log(firstValue)
            
            mystate.count[firstKey]=firstValue
        }
        
        
    }
})

export const {addItem,removeItem,clearCart,manageCount}=cartslice.actions

export default cartslice.reducer