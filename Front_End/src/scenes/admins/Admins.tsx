import FetchLate from "../../components/fetchLate/FetchLate";
import { useFetch } from "../../hooks/useFetch";
import OriginalDataGrid from "../../components/DataGrid/OriginalDataGrid";

export default function Admins() {
    const { data, isLoading, isError } = useFetch(
        "Admins",
        "management/admins"
    );
    if (isLoading || isError)
        return (
            <FetchLate isLoading={isLoading} isError={isError} text="admins" />
        );
    return <OriginalDataGrid data={data.data} isLoading={isLoading} />;
}
