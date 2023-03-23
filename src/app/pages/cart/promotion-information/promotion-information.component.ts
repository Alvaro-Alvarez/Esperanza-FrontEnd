import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-promotion-information',
  templateUrl: './promotion-information.component.html',
  styleUrls: ['./promotion-information.component.scss']
})
export class PromotionInformationComponent implements OnInit {

  @Input() promotion: any;
  @Input() type: string = '';
  hasImg: boolean = true;
  // @Output() complete: EventEmitter<any> = new EventEmitter();

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  close(){
    this.modal.dismiss();
  }
  getImgName(promotion: any): string{
    let name: string = promotion?.Codigo;
    return name + '.jpeg';
  }
  updateUrl(){
    this.hasImg = false;
  }
  getTotalPriceThree(){
    let price = 0;
    this.promotion.promotionsTypeThree.forEach((prom: any) => {
      price += (prom.unitPrice*prom.cant)
    });
    return price;
  }
  getImgNameOne(index: number): string{
    let image = this.promotion?.promotionTypeOne?.images[index];
    return image ? image : 'assets/no-image3.jpg';
  }
}
