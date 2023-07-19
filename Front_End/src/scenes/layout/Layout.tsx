import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navebar from "../../components/Navebar/Navebar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect } from "react";
import { setUserData } from "../../features/data/dataSlice";
import {
    toggleIsMobile,
    toggleIsOpen,
} from "../../features/sidebar/sidebarSlice";
import FetchLate from "../../components/FetchLate/FetchLate";
import { useFetch } from "../../hooks/useFetch";
const Layout = (): JSX.Element => {
    const dispatch = useDispatch();
    const { id } = useSelector((state: RootState) => state.Data);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const { isSidebarOpen } = useSelector((state: RootState) => state.Sidebar);
    const { data, isLoading, isError } = useFetch(
        ["User", id],
        `general/user/${id}`
    );
    useEffect(() => {
        dispatch(toggleIsMobile(isNonMobile));
        if (isNonMobile) {
            if (!isSidebarOpen) dispatch(toggleIsOpen());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNonMobile, dispatch]);
    useEffect(() => {
        dispatch(setUserData(data?.data?.user));
    }, [data, dispatch]);
    if (isLoading || isError)
        return (
            <FetchLate isLoading={isLoading} isError={isError} text="user" />
        );
    return (
        <Box
            display={isNonMobile ? "flex" : "block"}
            width={"100%"}
            height={"100%"}
            flexDirection={"row"}
        >
            <Sidebar drawerWidth={"250px"} />
            <Box flexGrow={3}>
                <Navebar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
