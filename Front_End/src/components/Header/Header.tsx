import { Typography, Box, useTheme } from "@mui/material";
interface propsState {
    title: string;
    subtitle: string;
}
const Header = ({ title, subtitle }: propsState) => {
    const theme = useTheme();
    return (
        <Box mb={"2rem"}>
            <Typography
                variant="h2"
                color={(theme.palette.secondary as unknown as ColorTokens)[200]}
                fontWeight={"bold"}
                sx={{ mb: "0.25rem" }}
            >
                {title}
            </Typography>
            <Typography
                variant="h5"
                color={(theme.palette.secondary as unknown as ColorTokens)[300]}
            >
                {subtitle}
            </Typography>{" "}
        </Box>
    );
};

export default Header;
