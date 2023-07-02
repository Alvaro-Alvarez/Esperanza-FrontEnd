export class Cart {
    packages: Package[];
    offers: Offer[];
    totalPrice: number;
    totalPriceWithIva: number;
    constructor(){
        this.packages = [];
        this.offers = [];
        this.totalPrice = 0;
        this.totalPriceWithIva = 0;
    }
}
export class Package {
    condition: string;
    products: Product[];
    price: number;
    priceWithIva: number;
    constructor(){
        this.products = [];
        this.condition = "";
        this.price = 0;
        this.priceWithIva = 0;
    }
}
export class Product {
    category: string;
    name: string;
    code: string;
    condition: string;
    iva: number;
    quantity: number;
    unitPrice: number;
    priceWithIva: number;
    totalPriceWithBonifications: number;
    imageUrl: string;
    stock: number;
    inStock: boolean;
    bonification: ProductBonification[];
    constructor(){
        this.bonification = [];
        this.category = "";
        this.name = "";
        this.condition = "";
        this.code = "";
        this.quantity = 0;
        this.iva = 0;
        this.unitPrice = 0;
        this.priceWithIva = 0;
        this.totalPriceWithBonifications = 0;
        this.stock = 0;
        this.inStock = false;
        this.imageUrl = "";
    }
}
export class ProductBonification {
    quantity: number;
    percentage: number;
    constructor(){
        this.quantity = 0;
        this.percentage = 0;
    }
}
export class Offer {
    type?: '001'|'003';
    quantity: number;
    condition: string;
    offerCode: string;
    promotion?: any;
    productSales: ProductSale[];
    bonifications: ProductBonification[];
    unitPrice: number;
    priceWithIva: number;
    iva: number;
    totalPriceWithBonifications: number;
    imageUrl: string;
    category: string;
    name: string;
    constructor(){
        this.quantity = 0;
        this.imageUrl = "";
        this.offerCode = "";
        this.condition = "";
        this.category = "";
        this.name = "";
        this.productSales = [];
        this.bonifications = [];
        this.unitPrice = 0;
        this.priceWithIva = 0;
        this.totalPriceWithBonifications = 0;
        this.iva = 0;
    }
}
export class ProductSale {
    category: string;
    quantity: number;
    code: string;
    iva: number;
    name: string;
    bonusAmmount?: any;
    unitPrice: number;
    priceWithIva: number;
    totalPriceWithBonifications: number;
    image: string;
    constructor(){
        this.quantity = 0;
        this.unitPrice = 0;
        this.priceWithIva = 0;
        this.totalPriceWithBonifications = 0;
        this.iva = 0;
        this.image = "";
        this.category = "";
        this.code = "";
        this.name = "";
    }
}