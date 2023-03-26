export class Shopping {
    itemsCcb?: ItemCart[];
    itemsCcm?: ItemCart[];
    itemPromotionsCart?: ItemPromotionCart[];
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

export class ItemPromotionCart {
    type?: '001'|'003';
    condition?: string;
    promotion?: any;
    promotionTypeOne?: PromotionTypeOne;
    promotionsTypeThree?: PromotionTypeThree[];
}
export class PromotionTypeOne {
    cant?: number;
    unitPrice?: number;
    iva?: number;
    images?: string[]
}
export class PromotionTypeThree {
    cant?: any;
    bonusAmmount?: any;
    unitPrice?: number;
    iva?: number;
    category?: string;
    name?: string;
    image?: string;
}