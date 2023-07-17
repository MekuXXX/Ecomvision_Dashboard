import FetchLate from "../../components/fetchLate/FetchLate.tsx";
import { useFetch } from "../../hooks/useFetch.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCustomers } from "../../features/data/dataSlice.ts";
import OriginalDataGrid from "../../components/DataGrid/OriginalDataGrid.tsx";

function Customers() {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useFetch(
        "Customers",
        "client/customers"
    );
    useEffect(() => {
        dispatch(setCustomers(data?.data));
    }, [data, dispatch]);

    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text={"cutomers"}
            />
        );
    return <OriginalDataGrid data={data.data} isLoading={isLoading} />;
}
export default Customers;
