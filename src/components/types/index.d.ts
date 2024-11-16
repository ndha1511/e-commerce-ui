import { ReactNode } from "react";
import { Product } from "../../models/product";

export interface QueryWrapperProps {
    children: ReactNode;
    queriesStatus: boolean[];
    skeleton?: React.ComponentType;
    skWidth?: number;
    skHeight?: number;
}

export interface ListProductProps {
    products?: Product[];
}