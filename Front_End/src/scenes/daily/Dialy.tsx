import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { ResponsiveLine, Serie } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import FetchLate from "../../components/fetchLate/FetchLate";
import "react-datepicker/dist/react-datepicker.css";
type sectionsType = {
    date: string;
    totalSales: number;
    totalUnits: number;
};
export default function Daily() {
    const [startDate, setStartDate] = useState<Date>(new Date("2021-02-01"));
    const [endDate, setEndDate] = useState<Date>(new Date("2021-03-01"));
    const theme = useTheme();
    const { data, isLoading, isError } = useFetch("OverallStats", "sales");
    const [formattedData] = useMemo(() => {
        if (!data) return [];
        const { dailyData } = data.data;
        const totalSalesLine: Serie = {
            id: "Total Sales",
            color: theme.palette.secondary?.main,
            data: [],
        };
        const totalUnitsLine: Serie = {
            id: "Total Units",
            color: (theme.palette.secondary as unknown as ColorTokens)[600],
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
        return [[totalSalesLine, totalUnitsLine]];
    }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps
    console.log(formattedData);
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
            <Box height={"75vh"}>
                <Box marginLeft={"auto"}>
                    <Box display={"inline-flex"}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Box>
                    <Box display={"inline-flex"}>
                        <DatePicker
                            selected={endDate}
                            onChange={(date: Date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </Box>
                </Box>
                <ResponsiveLine
                    data={formattedData as Serie[]}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: (
                                        theme.palette
                                            .secondary as unknown as ColorTokens
                                    )[200],
                                },
                            },
                            legend: {
                                text: {
                                    fill: (
                                        theme.palette
                                            .secondary as unknown as ColorTokens
                                    )[200],
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: (
                                        theme.palette
                                            .secondary as unknown as ColorTokens
                                    )[200],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: (
                                        theme.palette
                                            .secondary as unknown as ColorTokens
                                    )[200],
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: (
                                    theme.palette
                                        .secondary as unknown as ColorTokens
                                )[200],
                            },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.primary?.main as string,
                            },
                        },
                    }}
                    colors={{ datum: "color" }}
                    margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: false,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 90,
                        legend: "Month",
                        legendOffset: 60,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Total",
                        legendOffset: -50,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "top-right",
                            direction: "column",
                            justify: false,
                            translateX: 50,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </Box>
        </Box>
    );
}
