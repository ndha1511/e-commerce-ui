import { BaseModel } from "./base-model";

export interface Product extends BaseModel{
    productName: string;
    regularPrice: number;
    urlPath: string;
    city: string;
    categories: string[];
    brandId?: string;
    totalQuantity: number;
    thumbnail: string;
    numberOfRating: number;
    buyQuantity: number;
    rating: number;
}