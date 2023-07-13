import { createSlice } from "@reduxjs/toolkit";
const initialState: sidebarState = {
    isNonMobile: true,
    isSidebarOpen: true,
};

const sidebarSlice = createSlice({
    name: "Sidebar",
    initialState,
    reducers: {
        toggleIsMobile: (state, action) => {
            state.isNonMobile = action.payload;
        },
        toggleIsOpen: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
    },
});

export const { toggleIsMobile, toggleIsOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
