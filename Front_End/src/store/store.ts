import { configureStore } from "@reduxjs/toolkit";
import modeReducers from "../features/mode/modeSlice";
import sidebarReducers from "../features/sidebar/sidebarSlice";
import dataReducers from "../features/data/dataSlice.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../features/data/api.ts";
export const store = configureStore({
    reducer: {
        Mode: modeReducers,
        Sidebar: sidebarReducers,
        Data: dataReducers,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware),
    devTools: true,
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
