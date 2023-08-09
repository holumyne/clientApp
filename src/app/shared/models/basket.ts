import * as cuid from "cuid";

export interface BasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface Basket { // Is also the customer basket and a class is created for this becos we want to give it an id when we create a new instance of this
    id: string;
    items: BasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    shippingPrice: number;
}

export class Basket implements Basket { 
     id = cuid();  //a unique random string is generated when we create a new basket to identify one basket from another and we are generating it here becos Redis doesn't care what we use as id
    items: BasketItem[] = [];
    shippingPrice = 0;
}

export interface BasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}