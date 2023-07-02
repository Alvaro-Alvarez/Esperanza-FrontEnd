import { Component, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-description-and-total',
  templateUrl: './description-and-total.component.html',
  styleUrls: ['./description-and-total.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class DescriptionAndTotalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
