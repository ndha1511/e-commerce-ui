import { BaseModel } from "./base-model";

export interface Brand extends BaseModel{
    brandName: string;
    description: string;
    image: string;
    categories: string[];
    
}