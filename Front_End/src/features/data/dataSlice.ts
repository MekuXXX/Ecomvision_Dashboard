import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: userState = {
    id: "63701cc1f03239b7f700000e",
    userData: null,
    userProducts: null,
    customers: null,
    transactions: null,
    overallStats: null,
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setUserData: (state, action: PayloadAction<userData>) => {
            state.userData = action.payload;
        },
        setUserProducts: (state, action: PayloadAction<userProducts[]>) => {
            state.userProducts = action.payload;
        },
        setCustomers: (state, action: PayloadAction<userData[]>) => {
            state.customers = action.payload;
        },
        setTransactions: (state, action: PayloadAction<transactions[]>) => {
            state.transactions = action.payload;
        },
        setOverallStats: (state, action: PayloadAction<overallStats>) => {
            state.overallStats = action.payload;
        },
    },
});

export const {
    setUserId,
    setUserData,
    setUserProducts,
    setCustomers,
    setTransactions,
    setOverallStats,
} = userSlice.actions;
export default userSlice.reducer;
