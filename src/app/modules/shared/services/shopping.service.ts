import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { Cart, Offer, Package, Product, ProductBonification, ProductSale } from 'src/app/core/models/cart';
import { PromotionType } from 'src/app/core/enums/promotion-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private storageName = 'esp-cart';

  constructor(private eventService: EventService) { }

  addToCart(product: Product){
    const storageCart = this.getCartLocalStorage();
    const cartPackage = storageCart.packages.find(p => p.condition === product.condition);
    if (cartPackage){
      const productInPackage = cartPackage.products.find(p => p.code === product.code);
      if (productInPackage) productInPackage.quantity = productInPackage.quantity +1;
      else cartPackage.products.push(product);
    }
    else{
      const newPackage = new Package();
      newPackage.condition = product.condition;
      newPackage.products.push(product);
      storageCart.packages.push(newPackage);
    }
    this.resetPrices(storageCart);
  }
  addOfferToCart(offer: Offer){
    const storageCart = this.getCartLocalStorage();
    const cartOffer = storageCart.offers.find(o => o.offerCode === offer.offerCode);
    if (cartOffer) cartOffer.quantity = cartOffer.quantity + offer.quantity;
    else storageCart.offers.push(offer);
    this.resetPrices(storageCart);
  }
  resetPrices(cart: Cart){
    /************Common Products************/
    let sumPackagePrice = 0;
    let sumPackagePriceWithIva = 0;
    cart.packages.map((cartPackage: Package) => {
      let sumProductPrice = 0;
      let sumProductPriceWithIva = 0;
      cartPackage.products.map((product: Product) => {
        const totalPriceWithoutDiscount = (product.quantity * product.unitPrice);
        const currentBonification = this.getBonification(product.quantity, product.bonification);
        if (currentBonification){
          product.totalPriceWithBonifications = totalPriceWithoutDiscount - (totalPriceWithoutDiscount * (currentBonification.percentage / 100));
        }
        else product.totalPriceWithBonifications = (product.quantity * product.unitPrice);
        product.priceWithIva = product.totalPriceWithBonifications + (product.totalPriceWithBonifications* (product.iva/100));
        sumProductPrice = sumProductPrice + product.totalPriceWithBonifications;
        sumProductPriceWithIva = sumProductPriceWithIva + product.priceWithIva;
      });
      cartPackage.price = sumProductPrice;
      cartPackage.priceWithIva = sumProductPriceWithIva;
      sumPackagePrice = sumPackagePrice + cartPackage.price;
      sumPackagePriceWithIva = sumPackagePriceWithIva + cartPackage.priceWithIva;
    });
    cart.totalPrice = sumPackagePrice;
    cart.totalPriceWithIva = sumPackagePriceWithIva;

    /************Promotions************/
    let sumOfferPrice = 0;
    let sumOfferPriceWithIva = 0;
    cart.offers.map((offer: Offer) => {
      if (PromotionType.One === offer.type){
        offer.totalPriceWithBonifications = (offer.unitPrice * offer.quantity);
        offer.priceWithIva = offer.totalPriceWithBonifications + (offer.totalPriceWithBonifications* (offer.iva/100));
      }
      if (PromotionType.Three === offer.type){
        offer.productSales.map((productSale: ProductSale) => {
          productSale.totalPriceWithBonifications = (productSale.quantity * productSale.unitPrice);
          productSale.priceWithIva = productSale.totalPriceWithBonifications + (productSale.totalPriceWithBonifications* (offer.iva/100));
          sumOfferPrice = sumOfferPrice + productSale.totalPriceWithBonifications;
          sumOfferPriceWithIva = sumOfferPriceWithIva + productSale.priceWithIva;
        });
        offer.totalPriceWithBonifications = sumOfferPrice;
        offer.priceWithIva = sumOfferPriceWithIva;
      }
      cart.totalPrice = cart.totalPrice + offer.totalPriceWithBonifications;
      cart.totalPriceWithIva = cart.totalPriceWithIva + offer.priceWithIva;
    });
    this.addCartToLocalStorage(cart);
    this.eventService.onShoppingCartAction.emit();
  }
  addCartToLocalStorage(cart: Cart){
    localStorage.setItem(this.storageName, JSON.stringify(cart));
  }
  getCartLocalStorage(): Cart{
    const cart = localStorage.getItem(this.storageName);
    return cart ? JSON.parse(cart) as Cart : new Cart();
  }
  removeCartToLocalStorage(){
    localStorage.removeItem(this.storageName);
  }
  getBonification(quantity: number, bonification: ProductBonification[]) {
    let newBonif = null;
    for (let i = 0; i < bonification.length; i++) {
      if (quantity >= bonification[i].quantity && (bonification[i + 1]?.quantity === undefined || bonification[i + 1].quantity > quantity)) {
        newBonif = bonification[i].quantity === 1 ? null : bonification[i];
        return newBonif;
      }
    }
    return newBonif;
  }
}
