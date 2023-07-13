import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../../features/mode/modeSlice";
import profileImage from "../../assets/man.jpg";
import {
    AppBar,
    Box,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import FlexBetween from "../FlexBetween/FlexBetween";
import { toggleIsOpen } from "../../features/sidebar/sidebarSlice";
import { RootState } from "../../store/store";
import { useState } from "react";

const Navebar = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState(null);
    const mode = useSelector((state: RootState) => state.Mode.mode);
    const { userData } = useSelector((state: RootState) => state.Data);
    const theme = useTheme();
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (e: any) => {
        setAnchorEl(() => e.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);
    const isOpen = Boolean(anchorEl);
    return (
        <AppBar className="menu-bar" sx={{ position: "static" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <FlexBetween>
                    <IconButton onClick={() => dispatch(toggleIsOpen())}>
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            backgroundColor: `${theme.palette.background.alt}`,
                            padding: "0.125rem 0  0 1rem",
                            borderRadius: "0.5rem",
                        }}
                        className={"flex-between search"}
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </Box>
                </FlexBetween>
                <FlexBetween gap={"1.5rem"}>
                    <IconButton onClick={() => dispatch(toggleMode())}>
                        {mode === "dark" ? (
                            <DarkModeOutlined className="icon" />
                        ) : (
                            <LightModeOutlined className="icon" />
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined className="icon" />
                    </IconButton>
                    <FlexBetween>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                component={"img"}
                                alt="profile"
                                src={profileImage}
                                height={"32px"}
                                width={"32px"}
                                borderRadius={"50%"}
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign={"left"}>
                                <Typography
                                    fontWeight={"bold"}
                                    fontSize={"0.85rem"}
                                    sx={{
                                        color: theme.palette.secondary[100],
                                    }}
                                >
                                    {userData?.name || ""}
                                </Typography>
                                <Typography
                                    fontSize={"0.75rem"}
                                    sx={{
                                        color: theme.palette.secondary[200],
                                    }}
                                >
                                    {userData?.occupation || ""}
                                </Typography>
                            </Box>
                            <IconButton onClick={handleClick}>
                                <ArrowDropDownOutlined
                                    sx={{
                                        color: theme.palette.secondary[300],
                                        fontSize: "1.5rem",
                                    }}
                                />
                            </IconButton>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                Logout Out
                            </MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navebar;
