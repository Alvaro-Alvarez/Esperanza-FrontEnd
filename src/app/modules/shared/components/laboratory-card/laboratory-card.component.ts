import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratory-card',
  templateUrl: './laboratory-card.component.html',
  styleUrls: ['./laboratory-card.component.scss']
})
export class LaboratoryCardComponent implements OnInit {

  @Input() laboratory?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
