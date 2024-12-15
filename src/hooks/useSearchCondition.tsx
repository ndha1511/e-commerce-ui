import { useState } from "react";
import { pageQueryHanlder, SearchType, SortType } from "../utils/query-handler";
import useGetParam from "./useGetParam";

const useSearchCondition = (initSize?:number) => {
    const currentPage = useGetParam("page");
    const [page, setPage] = useState(Number(currentPage) || 1);
    const [size, setSize] = useState(initSize || 40);
    const [search, setSearch] = useState<SearchType[]>([]);
    const [sort, setSort] = useState<SortType[]>([]);

    const query = pageQueryHanlder(page, size, search, sort);

    return {
        query, 
        page, 
        size, 
        setPage, 
        setSize, 
        search, 
        sort, 
        setSearch, 
        setSort
    };

}

export default useSearchCondition;