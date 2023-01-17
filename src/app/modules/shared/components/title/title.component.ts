import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() title!: string;
  @Input() extraTitle!: string;
  @Input() spacingTop: boolean = false;
  @Input() spacingBot: boolean = false;
  @Output() goToLink: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  redirect(){
    this.goToLink.emit();
  }
}
