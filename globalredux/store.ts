'use client';

import {configureStore} from "@reduxjs/toolkit"


import counterReducer from "./Features/counter/counterSlice"
import valDataReducer from "./Features/validator/valDataSlice"
import attestationsDataReducer from "./Features/attestations/attestationsDataSlice"
import graphPointsDataReducer from "./Features/graphpoints/graphPointsDataSlice"
import paymentsReducer from "./Features/payments/paymentSlice"
import chargesReducer from "./Features/charges/chargesSlice"
import collateralReducer from "./Features/collateral/collateralSlice";
import darkModeReducer from "./Features/darkmode/darkModeSlice"
import poolsDataReducer from "./Features/pools/poolsDataSlice";


export const store = configureStore({
    reducer: {
        poolData: poolsDataReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>