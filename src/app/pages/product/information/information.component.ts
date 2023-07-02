import { Component, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class InformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
