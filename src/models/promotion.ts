

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



export interface Promotion {
    id: string;
    promotionName: string;
    discountType: DiscountType;
    discountValue: number;
    maxPrice?: number;
    startDate: Date;
    endDate: Date;
    applyFor?: string[];
    flashSale: boolean;
    view: boolean;
    image?: string;
    url: string;
    description?: string;

}