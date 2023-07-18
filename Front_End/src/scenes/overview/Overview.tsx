import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import Header from "../../components/header/Header";
import { useState } from "react";
import OverviewChart from "../../components/overviewChart/OverviewChart";
export type SelectType = "units" | "sales";

export default function Overview() {
    const [view, setView] = useState<SelectType>("units");
    return (
        <Box p={"2rem"}>
            <Header
                title="Overview"
                subtitle="Overview of revenue and profit"
            />
            <Box height={"75vh"}>
                <FormControl>
                    <InputLabel>View</InputLabel>
                    <Select
                        value={view}
                        label="View"
                        onChange={(e: SelectChangeEvent<SelectType>) =>
                            setView(e.target.value as SelectType)
                        }
                    >
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="units">Units</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view} />
            </Box>
        </Box>
    );
}
