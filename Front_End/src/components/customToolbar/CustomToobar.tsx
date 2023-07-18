import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from "@mui/x-data-grid";
import FlexBetween from "../fexBetween/FlexBetween";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import React, { ChangeEvent } from "react";
import { someQueryType } from "../../scenes/transactions/Transactions";

type Props = {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    setQueries: React.Dispatch<React.SetStateAction<someQueryType>>;
};

function CustomToobar({ searchInput, setSearchInput, setQueries }: Props) {
    return (
        <GridToolbarContainer>
            <FlexBetween width={"100%"}>
                <FlexBetween>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>
                <FlexBetween>
                    <TextField
                        label="Search..."
                        sx={{ mb: "0.5rem", width: "15rem" }}
                        value={searchInput}
                        variant="standard"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSearchInput(e.target.value)
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => {
                                            setQueries(
                                                (prev: someQueryType) => {
                                                    return {
                                                        ...prev,
                                                        search: searchInput,
                                                    };
                                                }
                                            );
                                            setSearchInput("");
                                        }}
                                    >
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FlexBetween>
            </FlexBetween>
        </GridToolbarContainer>
    );
}
export default CustomToobar;
