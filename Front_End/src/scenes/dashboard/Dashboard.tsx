import {
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import FetchLate from "../../components/FetchLate/FetchLate";
import Header from "../../components/Header/Header";
import { GridColDef } from "@mui/x-data-grid";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import {
    DownloadOutlined,
    Email,
    PersonAdd,
    PointOfSale,
    Traffic,
} from "@mui/icons-material";
import StatBox from "../../components/StatBox/StatBox";
import OverviewChart from "../../components/OverviewChart/OverviewChart";
import OriginalDataGrid from "../../components/DataGrid/OriginalDataGrid";
import BreakdownChart from "../../components/BreakdownChart/BreakdownChart";

const Dashboard = (): JSX.Element => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const { data, isLoading, isError } = useFetch(
        "Dashboard",
        "general/dashboard"
    );
    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: ({ value }) => value.length,
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: ({ value }) => `$${Number(value).toFixed(2)}`,
        },
    ];
    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text="dashboard"
            />
        );
    return (
        <Box p={"2rem"}>
            <FlexBetween>
                <Header
                    title="Dashboard"
                    subtitle="Welcome to your dashbaord"
                />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary?.light,
                            color: (
                                theme.palette
                                    .background as unknown as ColorOptions
                            ).alt,
                            "&:hover": {
                                backgroundColor: (
                                    theme.palette
                                        .background as unknown as ColorOptions
                                ).alt,
                                color: theme.palette.secondary?.light,
                            },
                            fontSize: "0.875rem",
                            fontWeight: "bold",
                            padding: "0.625rem 1.25rem",
                        }}
                    >
                        <DownloadOutlined sx={{ mr: "0.625rem" }} />
                        Dowload reports
                    </Button>
                </Box>
            </FlexBetween>
            <Box
                display={"grid"}
                gridTemplateColumns={"repeat(12,1fr)"}
                gridAutoRows={"10rem"}
                gap={"1.25rem"}
                sx={{
                    "& > div": {
                        gridColumn: isNonMediumScreens ? undefined : "span 12",
                    },
                }}
            >
                <StatBox
                    title="Total Customers"
                    value={data.data && data.data?.totalCustomers}
                    increase="+14%"
                    description="Since last month"
                    icon={
                        <Email
                            sx={{
                                color: (
                                    theme.palette
                                        .secondary as unknown as ColorTokens
                                )[300],
                                fontSize: "1.625rem",
                            }}
                        />
                    }
                />
                <StatBox
                    title="Sales Today"
                    value={data.data && data.data.todayStats.totalSales}
                    increase="+21%"
                    description="Since last month"
                    icon={
                        <PointOfSale
                            sx={{
                                color: (
                                    theme.palette
                                        .secondary as unknown as ColorTokens
                                )[300],
                                fontSize: "1.625rem",
                            }}
                        />
                    }
                />
                <Box
                    gridColumn={"span 8"}
                    gridRow={"span 2"}
                    borderRadius={"0.55rem"}
                    sx={{
                        backgroundColor: (
                            theme.palette.background as unknown as ColorOptions
                        ).alt,
                    }}
                >
                    <OverviewChart view="sales" isDashboard={true} />
                </Box>
                <StatBox
                    title="Monthly Sales"
                    value={data.data && data.data.thisMonthStats.totalSales}
                    increase="+5%"
                    description="Since last month"
                    icon={
                        <PersonAdd
                            sx={{
                                color: (
                                    theme.palette
                                        .secondary as unknown as ColorTokens
                                )[300],
                                fontSize: "26px",
                            }}
                        />
                    }
                />
                <StatBox
                    title="Yearly Sales"
                    value={data.data && data.data.yearlySalesTotal}
                    increase="+43%"
                    description="Since last month"
                    icon={
                        <Traffic
                            sx={{
                                color: (
                                    theme.palette
                                        .secondary as unknown as ColorTokens
                                )[300],
                                fontSize: "26px",
                            }}
                        />
                    }
                />
                <Box gridColumn={"span 8"} gridRow={"span 3"}>
                    <OriginalDataGrid
                        isDashboard={true}
                        columns={columns}
                        isLoading={isLoading}
                        data={data.data && data.data.transactions}
                    />
                </Box>
                <Box
                    gridColumn={"span 4"}
                    gridRow={"span 3"}
                    bgcolor={
                        (theme.palette.background as unknown as ColorOptions)
                            .alt
                    }
                    p={"1.5rem"}
                    borderRadius={"0.55rem"}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: (
                                theme.palette
                                    .secondary as unknown as ColorTokens
                            )[100],
                        }}
                    >
                        Sales by category
                    </Typography>
                    <BreakdownChart isDashboard={true} />
                    <Typography
                        p={"0 0 0.6rem"}
                        fontSize={"0.8rem"}
                        sx={{
                            color: (
                                theme.palette
                                    .secondary as unknown as ColorTokens
                            )[200],
                        }}
                    >
                        Breakdown of real states and information via category
                        for revenue made for this year and total sales.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
