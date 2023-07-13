import { Box, useTheme } from "@mui/material";
import FetchLate from "../../components/fetchLate/FetchLate.tsx";
import { useFetch } from "../../hooks/useFetch.tsx";
import Header from "../../components/Header/Header.tsx";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCustomers } from "../../features/data/dataSlice.ts";

function Customers() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { data, isLoading, isError } = useFetch(
        "Customers",
        "client/customers"
    );
    useEffect(() => {
        dispatch(setCustomers(data?.data));
    }, [data, dispatch]);
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: ({ value }: { value: string }) => {
                return value.replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
            },
        },
        {
            field: "country",
            headerName: "Country",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        },
    ];

    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text={"cutomers"}
            />
        );
    return (
        <Box p={"2rem"}>
            <Header title="Customers" subtitle="List of cutomers" />
            <Box
                height={"75vh"}
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background?.alt,
                        color: theme.palette.secondary?.[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background?.alt,
                        color: theme.palette.secondary?.[100],

                        borderTop: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary?.light,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary?.[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data?.data}
                    rows={data.data || []}
                    columns={columns as GridColDef<typeof columns>[]}
                    getRowId={(row) => row._id}
                />
            </Box>
        </Box>
    );
}
export default Customers;
