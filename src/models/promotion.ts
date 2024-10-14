import { Condition } from "./condition";

export enum PromotionType {
    DIRECT_DISCOUNT = 'DIRECT_DISCOUNT',
    CONDITION_DISCOUNT = 'CONDITION_DISCOUNT',
}

export enum DiscountType {
    PERCENT = 'PERCENT',
    AMOUNT = 'AMOUNT',
}

export enum LoopState {
    NO_LOOP = 'NO_LOOP',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    ANNUAL = 'ANNUAL',
}

export enum ApplyType {
    ALL = 'ALL',
    FOR_CATEGORY = 'FOR_CATEGORY',
    FOR_BRAND = 'FOR_BRAND',
    FOR_PRODUCT = 'FOR_PRODUCT',
}

export interface Promotion {
    promotionName: string;
    promotionType: PromotionType;
    discountType: DiscountType;
    discountValue: number;
    maxPrice?: number;
    startDate: Date;
    endDate: Date;
    loopType: LoopState;
    condition?: Condition;
    applyType: ApplyType;
    applyFor?: string[];

}