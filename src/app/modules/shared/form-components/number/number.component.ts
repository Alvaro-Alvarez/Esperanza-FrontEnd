import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  @Input() keyInput!: string;
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() type?: 'number'|'decimal'|'numberTS'|'numberCT'|'currency'|'numberTSD' = 'number';
  @Input() maxlength: number = 50;
  @Input() br ? = true;
  @Input() blockCopyAndPaste ? = false;
  @Input() validate ? = true;
  @Input() errMsg ? = '*el campo es requerido';
  @Input() currencySing ? = '';
  @Input() thousandsSeparator ? = '.';
  @Input() decimalSeparator ? = '';
  @Input() decimalPrecision ? = '0';
  @Output() changeInput: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  change(event: any){
    let value = this.parentForm.get(this.keyInput)?.value;
    this.changeInput.emit(value);
  }

}
