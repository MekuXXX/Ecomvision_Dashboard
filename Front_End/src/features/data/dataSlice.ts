import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: userState = {
    id: "63701cc1f03239b7f700000e",
    userData: null,
    userProducts: null,
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
    },
});

export const { setUserId, setUserData, setUserProducts } = userSlice.actions;
export default userSlice.reducer;
