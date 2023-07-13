import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard/Dashboard";
import Layout from "./scenes/layout/Layout";
import Products from "./scenes/products/Product";

const LayoutRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={<Navigate to={"/dashboard"} replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
            </Route>
        </Routes>
    );
};

export default LayoutRoutes;
