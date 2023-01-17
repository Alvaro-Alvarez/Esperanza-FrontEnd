import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {

  @Input() image: any;

  constructor() { }

  ngOnInit(): void {
  }

}
