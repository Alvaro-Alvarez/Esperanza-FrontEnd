export class Shopping {
    itemsCcb?: ItemCart[];
    itemsCcm?: ItemCart[];
    totalPrice?: number;
}

export class ItemCart {
    product?: any;
    productBas?: any;
    semaphoreStock?: any;
    quantity?: number;
    price?: number;
    condition?: string;
    availableStock?: boolean;
}