import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-semaphore-stock',
  templateUrl: './semaphore-stock.component.html',
  styleUrls: ['./semaphore-stock.component.scss']
})
export class SemaphoreStockComponent implements OnInit {

  @Input() status: string = 'Otro';
  enable: boolean = false;
  otherState1: boolean = false;
  otherState2: boolean = false;
  statusClass: string = 'status enable';

  constructor() { }

  ngOnInit(): void {
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
      case 'Otro':
        this.otherState1 = true;
        this.statusClass = 'status other'
    }
  }

}
