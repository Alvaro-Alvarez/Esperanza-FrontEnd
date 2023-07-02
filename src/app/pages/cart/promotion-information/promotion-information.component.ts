import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PromotionType } from 'src/app/core/enums/promotion-type.enum';
import { Offer } from 'src/app/core/models/cart';

@Component({
  selector: 'app-promotion-information',
  templateUrl: './promotion-information.component.html',
  styleUrls: ['./promotion-information.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class PromotionInformationComponent implements OnInit {

  @Input() offer?: Offer;
  @Input() type: string = '';
  hasImg: boolean = true;
  promotionType = PromotionType;

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
}
