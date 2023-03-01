import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-number-custom',
  templateUrl: './number-custom.component.html',
  styleUrls: ['./number-custom.component.scss']
})
export class NumberCustomComponent implements OnInit {

  @Input() quantity: number = 1;
  @Input() maxQuantity: number = 0;
  @Input() outOfStock: boolean = false;
  @Input() produdctDescription: boolean = false;
  @Input() items: any;
  @Input() index: number = 0;
  @Output() onAddElement: EventEmitter<number> = new EventEmitter();
  @Output() resetPrices:  EventEmitter<any> = new EventEmitter();
  @Output() deleteElement:  EventEmitter<any> = new EventEmitter();

  constructor(
    private alert: SweetAlertService
  ) { }

  ngOnInit(): void {
  }

  addElement(){
    if (this.produdctDescription){
      if(this.outOfStock) return;
    }
    if (this.quantity >= this.maxQuantity){
      this.alert.info('Stock superado', 'Superó el máximo de productos disponibles.', ()=>{})
      return;
    }

    this.quantity += 1;
    this.onAddElement.emit(this.quantity);
    this.resetPrices.emit({index: this.index, quantity: this.quantity, less: false});
  }
  decreaseElement(){
    if (this.quantity === 1){
      this.deleteElement.emit(true);
      return;
    }
    if(!this.outOfStock){
      if(this.quantity > 1) this.quantity -= 1;
      this.resetPrices.emit({index: this.index, quantity: this.quantity, less: true});
    }
  }
}
