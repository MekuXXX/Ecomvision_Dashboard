import { Typography, Box, useTheme } from "@mui/material";
interface propsState {
    title: string;
    subtitle: string;
}
const Header = ({ title, subtitle }: propsState) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography
                variant="h2"
                color={theme.palette.secondary[100]}
                fontWeight={"bold"}
                sx={{ mb: "0.25rem" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={theme.palette.secondary[300]}>
                {subtitle}
            </Typography>{" "}
        </Box>
    );
};

export default Header;
