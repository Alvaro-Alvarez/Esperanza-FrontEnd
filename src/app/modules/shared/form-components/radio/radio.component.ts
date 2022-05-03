import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  @Input() keyInput!: string;
  @Input() label!: string;
  @Input() colSizeLabel? = '6';
  @Input() colSizeRadio? = '6';
  @Input() options: any[] = [];
  @Input() br ? = true;
  @Input() right ? = true;
  @Input() isBool ? = true;
  @Input() buttonStyle ? = false;
  @Input() value1?: string;
  @Input() value2?: string;
  @Input() lblRadio1?: string;
  @Input() lblRadio2?: string;
  @Input() validate ? = true;
  @Input() errMsg ? = '*el campo es requerido';
  @Output() changeInput: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void { }
  change(event: any){
    this.changeInput.emit(event);
  }
}
