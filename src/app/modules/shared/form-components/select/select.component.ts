import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  @Input() keyInput!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() options: any[] = [];
  @Input() multiSelect = false;
  @Input() bindValue: string = 'guid';
  @Input() bindLabel: string = 'name';
  @Input() br ? = true;
  @Input() withCustomSearch ? = false;
  @Input() validate ? = true;
  @Input() errMsg ? = '*el campo es requerido';
  @Output() selectChange: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  change(event: any){
    this.selectChange.emit(event);
  }
  public customSearchFn(term: string, item: any){
    term = term.toLowerCase();
    // Creating and array of space saperated term and removinf the empty values using filter
    const splitTerm = term.split(' ').filter(t => t);
    const isWordThere: any[] = [];
    // Pushing True/False if match is found
    splitTerm.forEach(arr_term => {
      const search = item.nombre.toLowerCase();
      isWordThere.push(search.indexOf(arr_term) == 0);
    });
    const all_words = (this_word: any) => this_word;
    // Every method will return true if all values are true in isWordThere.
    isWordThere.sort((a,b)=>a - b);
    return isWordThere.every(all_words);
  }

}
