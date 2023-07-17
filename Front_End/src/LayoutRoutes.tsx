import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard/Dashboard";
import Layout from "./scenes/layout/Layout";
import Products from "./scenes/products/Product";
import Customers from "./scenes/customers/Customers";
import Transactions from "./scenes/transactions/Transactions";
import Geography from "./scenes/geography/Geography";
import Overview from "./scenes/overview/Overview";
import Daily from "./scenes/daily/Dialy";
import Monthly from "./scenes/monthy/Monthly";
import Breakdown from "./scenes/breakdown/Breakdown";
import Admins from "./scenes/admins/Admins";
import Performance from "./scenes/performance/Performance";

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
                <Route path="/customers" element={<Customers />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/daily" element={<Daily />} />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<Breakdown />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/performance" element={<Performance />} />
            </Route>
        </Routes>
    );
};

export default LayoutRoutes;
