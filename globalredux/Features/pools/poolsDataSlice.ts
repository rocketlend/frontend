'use client'


import { createSlice } from '@reduxjs/toolkit'




type poolObject = {

    balance: string
    allowance: string
    attoRPL: string
    blockNumber: number
    lender: string
    poolID: string
    endTime: string


}



type stateType = {
    data: Array<poolObject>
}


const initialState: stateType =  {

   data: [{
    balance: "",
    allowance: "",
    attoRPL: "",
    blockNumber: 0,
    lender: "NO POOLS",
    poolID: "NO POOLS",
    endTime: "",
   
    
   }]

}



















export const poolsDataSlice = createSlice({
    name: 'poolData',
    initialState,
    reducers: {
        getPoolData: (state, action) => {
            // Mutate the state to update it
            state.data = action.payload;
        },
      
    }
})

export const { getPoolData} = poolsDataSlice.actions;

export default poolsDataSlice.reducer;