import { Variant } from "../../../models/variant";

 export interface PurchaseItem{
    variant: Variant;
    quantity: number;
    importPrice: number;
 }