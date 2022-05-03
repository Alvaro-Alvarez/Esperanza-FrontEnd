import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  @Input() keyInput!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() maxlength: number = 300;
  @Input() rows ? = 4;
  @Input() cols ? = 50;
  @Input() br ? = true;
  @Input() validate ? = true;
  @Input() blockCopyAndPaste ? = false;
  @Input() errMsg ? = '*el campo es requerido';
  
  constructor() { }

  ngOnInit(): void {
  }

}
