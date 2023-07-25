import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { useFetch } from "../../hooks/useFetch";
import FetchLate from "../../components/fetchLate/FetchLate";
import { geoMap } from "../../map";

export default function Geography() {
    const theme = useTheme();
    const { data, isLoading, isError } = useFetch(
        "Geography",
        "client/geography"
    );
    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text="geography"
            />
        );
    return (
        <Box p={"2rem"}>
            <Header
                title="Geography"
                subtitle="Find  where your users are located"
            />
            <Box
                height={"75vh"}
                // IntrinsicAttributes
                border={`1px solid  ${
                    (theme.palette.secondary as unknown as ColorTokens)[200]
                }`}
            >
                <ResponsiveChoropleth
                    data={data.data}
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
                    features={geoMap.features}
                    margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                    domain={[0, 60]}
                    unknownColor="#666666"
                    label="properties.name"
                    valueFormat=".2s"
                    projectionScale={150}
                    projectionTranslation={[0.45, 0.6]}
                    projectionRotation={[0, 0, 0]}
                    borderWidth={1.3}
                    borderColor="#ffffff"
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: true,
                            translateX: 0,
                            translateY: -125,
                            itemsSpacing: 0,
                            itemWidth: 94,
                            itemHeight: 18,
                            itemDirection: "left-to-right",
                            itemTextColor: (
                                theme.palette
                                    .secondary as unknown as ColorTokens
                            )[200],
                            itemOpacity: 0.85,
                            symbolSize: 18,
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: (
                                            theme.palette
                                                .background as unknown as ColorOptions
                                        ).alt,
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
