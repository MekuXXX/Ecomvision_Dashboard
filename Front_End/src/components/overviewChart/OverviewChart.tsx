import { SelectType } from "../../scenes/overview/Overview";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useTheme } from "@mui/material";
import FetchLate from "../fetchLate/FetchLate";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setOverallStats } from "../../features/data/dataSlice";
import { useFetch } from "../../hooks/useFetch";

type Props = {
    isDashboard?: boolean;
    view: SelectType;
};
type accType = { sales: number; units: number };
type sectionsType = { month: string; totalSales: number; totalUnits: number };

export default function OverviewChart({ isDashboard = false, view }: Props) {
    const { data, isLoading, isError } = useFetch("OverallStats", "sales");
    const theme = useTheme();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setOverallStats(data?.data));
    }, [data, dispatch]);
    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if (!data) return [];
        const { monthlyData } = data.data;
        const totalSalesLine: Serie = {
            id: "Total Sales",
            color: theme.palette.secondary?.main,
            data: [],
        };
        const totalUnitsLine: Serie = {
            id: "Total Units",
            color: theme.palette.secondary?.[600],
            data: [],
        };
        Object.values(monthlyData).reduce(
            (acc: accType, sections) => {
                const newSections: sectionsType = sections as sectionsType;
                const curSales = acc.sales + newSections.totalSales;
                const curUnits = acc.units + newSections.totalUnits;
                totalSalesLine.data.push({
                    x: newSections.month,
                    y: curSales,
                });
                totalUnitsLine.data.push({ x: newSections.month, y: curUnits });
                return { sales: curSales, units: curUnits };
            },
            {
                sales: 0,
                units: 0,
            }
        );
        return [[totalSalesLine], [totalUnitsLine]];
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text="overall stats"
            />
        );
    return (
        <ResponsiveLine
            data={
                (view === "sales" ? totalSalesLine : totalUnitsLine) as Serie[]
            }
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200],
                        },
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                },
                tooltip: {
                    container: {
                        color: theme.palette.primary.main,
                    },
                },
            }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard
                    ? ""
                    : `Total ${
                          view === "sales" ? "Revenue" : "Units"
                      } for Year`,
                legendOffset: -60,
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
            legends={
                !isDashboard
                    ? [
                          {
                              anchor: "bottom-right",
                              direction: "column",
                              justify: false,
                              translateX: 30,
                              translateY: -40,
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
                      ]
                    : undefined
            }
        />
    );
}
