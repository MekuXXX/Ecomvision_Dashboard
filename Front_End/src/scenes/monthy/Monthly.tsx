import { useMemo } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";

import Header from "../../components/Header/Header";
import FetchLate from "../../components/fetchLate/FetchLate";
type sectionsType = {
    month: string;
    totalSales: number;
    totalUnits: number;
};
export default function Monthly() {
    const theme = useTheme();
    const { data, isLoading, isError } = useFetch("OverallStats", "sales");
    const [formattedData] = useMemo(() => {
        if (!data) return [];
        const { monthlyData } = data.data;
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
        Object.values(monthlyData).forEach((sections) => {
            const { month, totalSales, totalUnits }: sectionsType =
                sections as sectionsType;
            totalSalesLine.data.push({
                x: month,
                y: totalSales,
            });
            totalUnitsLine.data.push({
                x: month,
                y: totalUnits,
            });
        });
        return [[totalSalesLine, totalUnitsLine]];
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
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
            <Header title="Daily  Sales" subtitle="Chart of monthly sales" />
            <Box height={"75vh"}>
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
                                color: theme.palette.primary.main as string,
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
