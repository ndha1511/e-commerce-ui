import { PurchaseOrder } from "../../../models/purchase-order";
import { PurchaseItem } from "./purchase-item";

export interface PurchaseDetail {
    purchaseOrder: PurchaseOrder;
    purchaseItems: PurchaseItem[];
}