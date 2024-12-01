import { useState } from "react";
import { pageQueryHanlder, SearchType, SortType } from "../utils/query-handler";

const useSearchCondition = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(40);
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