export interface Product {
    id: string;
    productName: string;
    regularPrice: number;
    shopId: string;
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