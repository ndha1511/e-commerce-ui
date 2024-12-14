import { Address } from "./address";
import { BaseModel } from "./base-model";

export interface PurchaseOrder extends BaseModel{
    inventories: string[];
    totalQuantity: number;
    totalPrice: number;
    orderDate: Date;
    importStaffName: string;
    address: Address;
}