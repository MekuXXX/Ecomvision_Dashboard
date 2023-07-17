import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { RootState } from "../../store/store";
import FetchLate from "../../components/fetchLate/FetchLate";

export default function Performance() {
    const id = useSelector((state: RootState) => state.Data.id);
    const { data, isLoading, isError } = useFetch(
        "Peformance",
        `management/performance/${id}`
    );
    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text="performance"
            />
        );
    console.log(data);
    return <div>Performance</div>;
}
