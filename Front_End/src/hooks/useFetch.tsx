import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const fetchProducts = (path: string) =>
    axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${path}`);

export const useFetch = (name: string | (string | number)[], path: string) => {
    return useQuery(
        [name],
        () => {
            return fetchProducts(path);
        },
        {
            cacheTime: 60000,
            refetchOnMount: false,
            refetchOnWindowFocus: true,
            refetchIntervalInBackground: true,
            keepPreviousData: true,
        }
    );
};
