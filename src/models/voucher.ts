import { DiscountType } from "./promotion";

export interface Voucher {
    voucherName: string;
    code: string;
    discountType: DiscountType;
    discountValue: number;
    startDate: Date;
    endDate: Date;
    quantity: number;
    minOrder: number;
    maxPrice: number;
    image: string;
}