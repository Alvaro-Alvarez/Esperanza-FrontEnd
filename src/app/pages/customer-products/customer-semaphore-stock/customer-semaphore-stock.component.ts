import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-semaphore-stock',
  templateUrl: './customer-semaphore-stock.component.html',
  styleUrls: ['./customer-semaphore-stock.component.scss']
})
export class CustomerSemaphoreStockComponent implements OnInit {

  @Input() semaphoreStr: string = '';
  status: string = 'Sin Stock';
  enable: boolean = false;
  otherState1: boolean = false;
  otherState2: boolean = false;
  statusClass: string = 'status enable';

  constructor() { }

  ngOnInit(): void {
    let semaphore = JSON.parse(this.semaphoreStr);
    switch(semaphore[0].INDICADOR){
      case 'VERDE': this.status = 'Disponible'
      break;
      case 'AMARILLO': this.status = 'Stock Crítico'
      break;
      case 'ROJO': this.status = 'Sin Stock'
      break;
    }
    this.getStateColor();
  }

  getStateColor(){
    //setear la clase más el redondito
    switch(this.status){
      case 'Disponible':
        this.enable = true;
        break;
      case 'Sin Stock': 
        this.otherState2 = true;
        this.statusClass = 'status'
        break;
      case 'Stock Crítico':
        this.otherState1 = true;
        this.statusClass = 'status other'
    }
  }
}
