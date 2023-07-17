import { Box, useTheme } from "@mui/system";
import Header from "../Header/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataObject {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    country: string;
    role: string;
}

type Props = {
    isLoading: boolean;
    data: DataObject[] | null | undefined;
};
export default function OriginalDataGrid({ isLoading, data }: Props) {
    const theme = useTheme();
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
    return (
        <Box p={"2rem"}>
            <Header title="Admins" subtitle="List of admins" />
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
                    loading={isLoading || !data}
                    rows={data || []}
                    columns={columns}
                    getRowId={(row: { _id: string }) => row._id}
                />
            </Box>
        </Box>
    );
}
