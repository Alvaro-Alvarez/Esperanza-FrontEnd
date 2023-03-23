import { Injectable } from '@angular/core';
import { ItemCart, ItemPromotionCart, Shopping } from 'src/app/core/models/shopping';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private storageName = 'esp-cart';

  constructor(private eventService: EventService) { }

  getLocalCart(): Shopping{
    const bagJson = localStorage.getItem(this.storageName);
    return bagJson ? JSON.parse(bagJson) as Shopping : new Shopping();
  }
  addToLocalStorage(item: ItemCart){
    let shoppingCart: any = localStorage.getItem(this.storageName);
    if (!shoppingCart){
      let newCart = new Shopping();
      newCart.itemsCcb = [];
      newCart.itemsCcm = [];
      newCart.itemPromotionsCart = [];
      if (item.condition == 'CCM') newCart.itemsCcm.push(item);
      else newCart.itemsCcb.push(item);
      newCart.totalPrice = item.price;
      this.setShoppingBag(newCart);
    }
    else{
      const newShoppingCart = this.getLocalCart();
      if (item.condition == 'CCM') newShoppingCart.itemsCcm?.push(item);
      else newShoppingCart.itemsCcb?.push(item);
      
      newShoppingCart.totalPrice = item.price && newShoppingCart.totalPrice ? newShoppingCart.totalPrice + item.price : newShoppingCart.totalPrice;
      this.resetShoppingBag(newShoppingCart);
    }
    this.eventService.onShoppingCartAction.emit();
  }
  addPromotionToLocalStorage(itemPromotion: ItemPromotionCart){
    let shoppingCart: any = localStorage.getItem(this.storageName);
    if (!shoppingCart){
      let newCart = new Shopping();
      newCart.itemsCcb = [];
      newCart.itemsCcm = [];
      newCart.itemPromotionsCart = [];
      newCart.itemPromotionsCart.push(itemPromotion);
      let newPrice = 0;
      if (itemPromotion.type === '001'){
        newPrice = (itemPromotion.promotionTypeOne?.cant! * itemPromotion.promotionTypeOne?.unitPrice!)
      }
      if (itemPromotion.type === '003'){
        itemPromotion?.promotionsTypeThree?.forEach((promotion: any) => {
          newPrice += (promotion.cant * promotion.unitPrice);
        });
      }
      newCart.totalPrice = newPrice;
      this.setShoppingBag(newCart);
    }
    else{
      const newShoppingCart = this.getLocalCart();
      newShoppingCart.itemPromotionsCart = newShoppingCart.itemPromotionsCart ? newShoppingCart.itemPromotionsCart : [];
      newShoppingCart?.itemPromotionsCart?.push(itemPromotion);
      // newShoppingCart.itemPromotionsCart = [];
      let newPrice = 0;
      if (itemPromotion.type === '001'){
        newPrice = (itemPromotion.promotionTypeOne?.cant! * itemPromotion.promotionTypeOne?.unitPrice!)
      }
      if (itemPromotion.type === '003'){
        itemPromotion?.promotionsTypeThree?.forEach((promotion: any) => {
          newPrice += (promotion.cant * promotion.unitPrice);
        });
      }
      newShoppingCart.totalPrice = newShoppingCart?.totalPrice! + newPrice;
      this.resetShoppingBag(newShoppingCart);
    }
    this.eventService.onShoppingCartAction.emit();
  }
  setShoppingBag(bag: any){
    localStorage.setItem(this.storageName, JSON.stringify(bag));
  }
  removeShoppingBag(){
    localStorage.removeItem(this.storageName);
  }
  resetShoppingBag(bag: any){
    localStorage.removeItem(this.storageName);
    localStorage.setItem(this.storageName, JSON.stringify(bag));
  }
}
