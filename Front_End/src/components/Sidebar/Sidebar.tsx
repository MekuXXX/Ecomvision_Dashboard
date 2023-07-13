import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsOpen } from "../../features/sidebar/sidebarSlice";
import profileImage from "../../assets/man.jpg";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutline,
    TodayOutlined,
} from "@mui/icons-material";
import { RootState } from "../../store/store";
import FlexBetween from "../FlexBetween/FlexBetween";
type propsState = {
    drawerWidth: string;
};
interface NavItemState {
    text: string;
    icon: JSX.Element | null;
}
const navItems: NavItemState[] = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overwiew",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutline />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Preformance",
        icon: <TrendingUpOutlined />,
    },
];
const Sidebar = ({ drawerWidth }: propsState) => {
    const dispatch = useDispatch();
    const { isSidebarOpen, isNonMobile } = useSelector(
        (state: RootState) => state.Sidebar
    );
    const { userData } = useSelector((state: RootState) => state.Data);
    const { pathname } = useLocation();
    const [active, setActive] = useState<string>();
    const navigate = useNavigate();
    const theme = useTheme();
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);
    return (
        <Box component={"nav"}>
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => dispatch(toggleIsOpen())}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "0.125rem",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width={"100%"}>
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={"0.5rem"}
                                >
                                    <Typography
                                        variant="h4"
                                        fontWeight={"bold"}
                                        textTransform={"uppercase"}
                                    >
                                        Ecomvision
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton
                                        onClick={() => dispatch(toggleIsOpen())}
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }: NavItemState) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{ m: "2.25rem 0 1rem 3rem" }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette
                                                              .secondary[300]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette
                                                              .primary[400]
                                                        : theme.palette
                                                              .primary[200],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color: "inherit",
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined
                                                    sx={{
                                                        marginLeft: "1.2rem",
                                                    }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    {userData && (
                        <Box position={"absolute"} bottom={"2rem"}>
                            <Divider />
                            <FlexBetween
                                textTransform={"none"}
                                gap={"1rem "}
                                m={"1.5rem 2rem 0 3rem"}
                            >
                                <Box
                                    component={"img"}
                                    alt="profile"
                                    src={profileImage}
                                    height={"40px"}
                                    width={"40px"}
                                    borderRadius={"50%"}
                                    sx={{ objectFit: "cover" }}
                                />
                                <Box textAlign={"left"}>
                                    <Typography
                                        fontWeight={"bold"}
                                        fontSize={"0.9rem"}
                                        sx={{
                                            color: theme.palette.secondary[100],
                                        }}
                                    >
                                        {userData.name || ""}
                                    </Typography>
                                    <Typography
                                        fontSize={"0.8rem"}
                                        sx={{
                                            color: theme.palette.secondary[200],
                                        }}
                                    >
                                        {userData.occupation || ""}
                                    </Typography>
                                </Box>
                                <SettingsOutlined
                                    sx={{
                                        color: theme.palette.secondary[300],
                                        fontSize: "1.5rem",
                                    }}
                                />
                            </FlexBetween>
                        </Box>
                    )}
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
