import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface propsState {
    isLoading: boolean;
    isError: boolean;
    text: string;
}
const FetchLate = ({ isLoading, isError, text }: propsState) => {
    if (isError)
        return (
            <Typography variant="h1" p={"2rem"}>
                Error in fetching {text}
            </Typography>
        );
    if (isLoading)
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height={"100%"}
            >
                <CircularProgress />
            </Box>
        );
};

export default FetchLate;
