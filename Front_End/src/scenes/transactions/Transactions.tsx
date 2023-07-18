import { Box, useTheme } from "@mui/material";
import Header from "../../components/header/Header";
import { useFetch } from "../../hooks/useFetch";
import { useDispatch } from "react-redux";

import { setTransactions } from "../../features/data/dataSlice";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import CustomToobar from "../../components/customToolbar/CustomToobar";

export interface someQueryType {
    sort: GridSortModel;
    search: string;
}

interface paginationModel {
    page: number;
    pageSize: number;
}

function Transactions() {
    const [queries, setQueries] = useState<someQueryType>({
        sort: [],
        search: "",
    });
    const [searchInput, setSearchInput] = useState("");
    const [paginationModel, setPaginationModel] = useState<paginationModel>({
        page: 0,
        pageSize: 20,
    });
    const dispatch = useDispatch();
    const theme = useTheme();

    const { data, isLoading } = useFetch(
        [
            "Transactions",
            JSON.stringify(paginationModel),
            JSON.stringify(queries),
        ],
        `client/transactions?${
            paginationModel.page ? "page=" + paginationModel.page : ""
        }${
            paginationModel.pageSize
                ? "&pageSize=" + paginationModel.pageSize
                : ""
        }${queries.search ? "&search=" + queries.search : ""}${
            queries.sort.length === 0
                ? ""
                : "&sort=" + JSON.stringify(queries.sort[0])
        }`
    );

    useEffect(() => {
        dispatch(setTransactions(data?.data?.transactions));
    }, [data, dispatch]);

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
    return (
        <Box p={"2rem"}>
            <Header title="Transactions" subtitle="List of transactions" />
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
                    getRowId={({ _id }: { _id: number }) => _id}
                    rows={data?.data.transactions || []}
                    columns={columns}
                    rowCount={(data?.data && data.data.total) || 0}
                    pagination
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[20, 50, 100]}
                    sortingMode="server"
                    onSortModelChange={(newSortModel: GridSortModel) =>
                        setQueries({
                            ...queries,
                            sort: newSortModel,
                        })
                    }
                    slots={{
                        toolbar: CustomToobar,
                    }}
                    slotProps={{
                        toolbar: { searchInput, setSearchInput, setQueries },
                    }}
                />
            </Box>
        </Box>
    );
}

export default Transactions;
