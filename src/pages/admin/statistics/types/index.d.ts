import { ProductSelling } from "../../../../dtos/response/product/product-selling";
import { Revenue } from "../../../../dtos/response/statistics/revenue";
import { RevenueDay } from "../../../../dtos/response/statistics/revenue-day";
import { RevenueMonth } from "../../../../dtos/response/statistics/revenue-month";
import { UserAmount } from "../../../../dtos/response/user/user-amount";

export interface SatisticsSearch {
    startDate?: string;
    endDate?: string;
    monthYear?: string;
    year?: number;
}

export interface Mode {
    mode: "daily" | "monthly" | "weekly" | "year";
}

export interface SatisticsProps {
    search: SatisticsSearch;
    setSearch:  React.Dispatch<React.SetStateAction<SatisticsSearch>>;
    mode: Mode["mode"]
    setMode: React.Dispatch<React.SetStateAction<"year" | "daily" | "monthly" | "weekly">>

}

export interface ProductBestSellingProps {
    products: ProductSelling[];
}

export interface TopUserProps {
    users: UserAmount[];
}

export interface ContentProps extends SatisticsSearch {
    revenueMonths?: RevenueMonth[];
    totalOrder?: number;
    revenueDays?: RevenueDay[];
    usersAmount?: UserAmount[];
    productsSelling?: ProductSelling[];
    revenue?: Revenue;
    
}