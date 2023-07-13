import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import LayoutRoutes from "./LayoutRoutes";

function App() {
    const mode = useSelector((state: RootState) => state.Mode.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <LayoutRoutes />
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
