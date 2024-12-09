import { ReactNode } from "react";
import { Product } from "../../models/product";

export interface SkeletonWrapperProps {
    children: ReactNode;
    queriesStatus: boolean[];
    skeleton?: React.ComponentType;
    skWidth?: number;
    skHeight?: number;
    skCount?: number;
}

export interface QueryWrapperProps {
    children: ReactNode;
    queriesError: boolean[];
    error?: unknown;
}

export interface ListProductProps {
    title?: string;
    products?: Product[];
    loading?: boolean;
}