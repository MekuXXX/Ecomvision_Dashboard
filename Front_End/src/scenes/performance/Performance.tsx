import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { RootState } from "../../store/store";
import FetchLate from "../../components/fetchLate/FetchLate";
import { Box } from "@mui/material";
import Header from "../../components/header/Header";
import { GridColDef } from "@mui/x-data-grid";
import OriginalDataGrid from "../../components/dataGrid/OriginalDataGrid";

export default function Performance() {
    const id = useSelector((state: RootState) => state.Data.id);
    const { data, isLoading, isError } = useFetch(
        "Peformance",
        `management/performance/${id}`
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
            flex: 0.5,
        },
        {
            field: "createdAt",
            headerName: "Ceated At",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length,
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
    ];
    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text="performance"
            />
        );
    return (
        <Box p={"2rem"}>
            <Header
                title="Performance"
                subtitle="Track you affiliate sales performance here"
            />
            <OriginalDataGrid
                data={data.data && data.data.sales}
                columns={columns}
                isLoading={isLoading}
            />
        </Box>
    );
}
