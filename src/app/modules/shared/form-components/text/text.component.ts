import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  @Input() keyInput!: string;
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() type?: 'text'|'textCapital'|'textCapitalSimple'|'password' = 'text';
  @Input() maxlength: number = 50;
  @Input() br ? = true;
  @Input() messageBelow ? = true;
  @Input() blockCopyAndPaste ? = false;
  @Input() validate ? = true;
  @Input() errMsg ? = '*el campo es requerido';
  @Output() changeInput: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  change(event: any){
    let value = this.parentForm.get(this.keyInput)?.value;
    this.changeInput.emit(value);
  }

}
