import { ReactNode } from "react";
import { Product } from "../../models/product";

export interface SkeletonWrapperProps {
    children: ReactNode;
    queriesStatus: boolean[];
    skeleton?: ReactNode;
    skWidth?: number;
    skHeight?: number;
    skCount?: number;
}

export interface QueryWrapperProps {
    children: ReactNode;
    queriesError: boolean[];
    queriesSuccess: boolean[];
    error?: unknown;
}

export interface ListProductProps {
    title?: string;
    products?: Product[];
    loading?: boolean;
    skSize?: number;
}

export interface SkeletonCustomProps {
    size?: number;
}