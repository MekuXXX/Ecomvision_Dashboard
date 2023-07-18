import { Box, useTheme } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
    isDashboard?: boolean;
    isLoading: boolean;
    columns: GridColDef[];
    data: null | undefined;
};
export default function OriginalDataGrid({
    isDashboard = false,
    isLoading,
    columns,
    data,
}: Props) {
    const theme = useTheme();
    return (
        <Box
            height={"75vh"}
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                    borderRadius: isDashboard ? "5rem" : "",
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
                    backgroundColor: isDashboard
                        ? theme.palette.background?.alt
                        : theme.palette.primary?.light,
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
    );
}
