import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, useTheme } from "@mui/material";
import FetchLate from "../../components/fetchLate/FetchLate";
import "react-datepicker/dist/react-datepicker.css";
import { useFetch } from "../../hooks/useFetch";
import { setOverallStats } from "../../features/data/dataSlice";
import Header from "../../components/Header/Header";
type sectionsType = {
    date: string;
    totalSales: number;
    totalUnits: number;
};
export default function Daily() {
    const [startDate, setStartDate] = useState<Date>(new Date("2021-02-01"));
    const [endDate, setEndDate] = useState<Date>(new Date("2021-03-01"));
    const dispatch = useDispatch();
    const theme = useTheme();
    const { data, isLoading, isError } = useFetch("OverallStats", "sales");
    useEffect(() => {
        dispatch(setOverallStats(data?.data));
    }, [data, dispatch]);
    const [formattedData] = useMemo(() => {
        if (!data) return [];
        const { dailyData } = data.data;
        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary?.main,
            data: [],
        };
        const totalUnitsLine = {
            id: "totalSales",
            color: theme.palette.secondary?.[600],
            data: [],
        };
        Object.values(dailyData).forEach((sections) => {
            const { date, totalSales, totalUnits }: sectionsType =
                sections as sectionsType;
            const dateFormatted = new Date(date);
            if (startDate <= dateFormatted && dateFormatted <= endDate) {
                const splitDate = date.substring(date.indexOf("-") + 1);
                totalSalesLine.data.push({
                    x: splitDate,
                    y: totalSales,
                });
                totalUnitsLine.data.push({
                    x: splitDate,
                    y: totalUnits,
                });
            }
        });
        const formattedData = [totalSalesLine, totalUnitsLine];
        return [[formattedData]];
    }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps
    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text={"overall stats"}
            />
        );
    return (
        <Box p={"2rem"}>
            <Header title="Daily  Sales" subtitle="Chart of daily sales" />
            <Box height={"75vh"}></Box>
        </Box>
    );
}
