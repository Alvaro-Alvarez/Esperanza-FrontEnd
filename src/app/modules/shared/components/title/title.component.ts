import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() title!: string;
  @Input() brTop!: boolean;
  @Input() brBot!: string;
  @Input() type: 'title'|'subtitle' = 'title';

  constructor() { }

  ngOnInit(): void {
  }

}
