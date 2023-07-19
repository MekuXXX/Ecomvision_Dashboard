import FetchLate from "../../components/FetchLate/FetchLate";
import { useFetch } from "../../hooks/useFetch";
import OriginalDataGrid from "../../components/DataGrid/OriginalDataGrid";
import { Box } from "@mui/system";
import Header from "../../components/Header/Header";
import { GridColDef } from "@mui/x-data-grid";

export default function Admins() {
    const { data, isLoading, isError } = useFetch(
        "Admins",
        "management/admins"
    );
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
            <FetchLate isLoading={isLoading} isError={isError} text="admins" />
        );
    return (
        <Box p={"2rem"}>
            <Header
                title="Admins"
                subtitle="Managing admins and list of admins"
            />
            <OriginalDataGrid
                data={data.data}
                columns={columns}
                isLoading={isLoading}
            />
        </Box>
    );
}
