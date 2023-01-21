import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-custom',
  templateUrl: './number-custom.component.html',
  styleUrls: ['./number-custom.component.scss']
})
export class NumberCustomComponent implements OnInit {

  @Input() quantity!: number;

  constructor() { }

  ngOnInit(): void {
  }

  addElement(){
    this.quantity += 1;
  }
 
  decreaseElement(){
    if(this.quantity > 1) this.quantity -= 1;
  }

}
