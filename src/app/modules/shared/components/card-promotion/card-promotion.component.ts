import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-promotion',
  templateUrl: './card-promotion.component.html',
  styleUrls: ['./card-promotion.component.scss']
})
export class CardPromotionComponent implements OnInit {

  @Input() urlImage: string = '';
  @Input() title: string = '';
  @Output() goTo: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  goToUrl(){
    this.goTo.emit();
  }
}
