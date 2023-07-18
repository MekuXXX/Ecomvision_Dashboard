import FetchLate from "../../components/fetchLate/FetchLate.tsx";
import { useFetch } from "../../hooks/useFetch.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCustomers } from "../../features/data/dataSlice.ts";
import OriginalDataGrid from "../../components/dataGrid/OriginalDataGrid.tsx";
import Header from "../../components/header/Header.tsx";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";

function Customers() {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useFetch(
        "Customers",
        "client/customers"
    );
    useEffect(() => {
        dispatch(setCustomers(data?.data));
    }, [data, dispatch]);
    const columns: GridColDef[] = [
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
            renderCell: ({ value }) => {
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
            <Header title="Customers" subtitle="List of customers" />
            <OriginalDataGrid
                data={data.data}
                columns={columns}
                isLoading={isLoading}
            />
        </Box>
    );
}
export default Customers;
