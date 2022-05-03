import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  @Input() keyInput!: string;
  @Input() label!: string;
  @Input() options: any[] = [];
  @Input() br ? = true;
  // @Input() valueProp?: IValueProp = {value: 'id', name: 'nombre'};
  // @Input() type?: 'button' | 'box' = 'box';
  // @Input() sizeCheck ? = 8;
  // @Input() sizeLabel ? = 4;
  // @Input() vertical ? = true
  
  constructor() { }

  ngOnInit(): void {
  }

}
