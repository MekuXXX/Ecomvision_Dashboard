import { Box, Typography, useTheme, Theme } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import FetchLate from "../fetchLate/FetchLate";
import { MayHaveLabel, ResponsivePie } from "@nivo/pie";

type Props = {
    isDashboard: boolean;
};
export default function BreakdownChart({ isDashboard = false }: Props) {
    const theme: Theme = useTheme();
    const { data, isLoading, isError } = useFetch("OverallStats", "sales");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const colors = [
        (theme.palette.secondary as unknown as ColorTokens)[500],
        (theme.palette.secondary as unknown as ColorTokens)[300],
        (theme.palette.secondary as unknown as ColorTokens)[300],
        (theme.palette.secondary as unknown as ColorTokens)[500],
    ];

    let formattedData;
    if (data?.data) {
        formattedData = Object.entries(data?.data?.salesByCategory).map(
            ([category, sales], i) => ({
                id: category.charAt(0).toUpperCase() + category.substring(1),
                label: `${
                    category.charAt(0).toUpperCase() + category.substring(1)
                }`,
                value: sales,
                color: colors[i],
            })
        );
    }
    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text="overall stats"
            />
        );
    return (
        <Box
            height={isDashboard ? "25rem" : "100%"}
            width={undefined}
            minHeight={isDashboard ? "23rem" : undefined}
            minWidth={isDashboard ? "23rem" : undefined}
            position={"relative"}
        >
            <ResponsivePie
                data={formattedData as MayHaveLabel[]}
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
                colors={{ datum: "data.color" }}
                margin={
                    isDashboard
                        ? { top: 40, right: 80, bottom: 100, left: 50 }
                        : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                sortByValue={true}
                innerRadius={0.4}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={!isDashboard}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={
                    (theme.palette.secondary as unknown as ColorTokens)[200]
                }
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: isDashboard ? 20 : 0,
                        translateY: isDashboard ? 50 : 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: (
                                        theme.palette
                                            .secondary as unknown as ColorTokens
                                    )[200],
                                },
                            },
                        ],
                    },
                ]}
            />
            <Box
                position={"absolute"}
                top={"50%"}
                left={"50%"}
                color={(theme.palette.secondary as unknown as ColorTokens)[200]}
                textAlign={"center"}
                sx={{
                    transform: isDashboard
                        ? "translate(-85% , -170%)"
                        : "translate(-50% , -70%)",
                    pointerEvents: "none",
                }}
            >
                <Typography variant="h6">
                    {(!isDashboard ? "Total: " : "") +
                        `$${data.data.yearlySalesTotal}`}
                </Typography>
            </Box>
        </Box>
    );
}
