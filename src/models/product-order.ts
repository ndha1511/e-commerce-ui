export interface ProductOrder {
    productId: string;
    productName: string;
    attributes: string[];
    price: number;
    productNumId: number;
    quantity: number;
    amount: number;
    image: string;
    allowComment: boolean;
    commented: boolean;
    url: string;
}