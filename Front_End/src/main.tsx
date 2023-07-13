import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const query = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={query}>
            <Provider store={store}>
                <App />
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-right"
                />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
