import { Tag } from "../../../models/tag";
import { ProductAttributeDto } from "./product-attribute.reques";
import { VariantDto } from "./variant.reques";

export interface CreateProductDto {
    productName: string;
    regularPrice: number;
    shopId: string;
    categories: string[];
    brandId: string;
    city: string;
    thumbnailIndex: number;
    images: File[];
    video?: File;
    attributesDto: ProductAttributeDto[];
    variantsDto: VariantDto[];
    description: string;
    tag?: Tag[];
}