import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import BreakdownChart from "../../components/breakdownChart/BreakdownChart";

export default function Breakdown() {
    return (
        <Box p={"2em"}>
            <Header
                title="Breakdown"
                subtitle="Break down of sales by category"
            />
            <Box height={"75vh"}>
                <BreakdownChart isDashboard={false} />
            </Box>
        </Box>
    );
}
