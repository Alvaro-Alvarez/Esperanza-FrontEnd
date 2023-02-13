import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  @Input() keyInput!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() br ? = true;
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() colSizeLabel? = '4';
  @Input() colSizeInput? = '7';
  @Output() selectChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.minDate = this.minDate ? this.minDate : DatepickerComponent.getMinDate();
    this.maxDate = this.maxDate ? this.maxDate : DatepickerComponent.getMaxDate();
    // Uso Javascript nativo por que no hay manera que el html recozca el minimo y 
    // maximo pasandole las variables con los corchetes de angular
    document.getElementById("datePicker")?.setAttribute("min", this.minDate!);
    document.getElementById("datePicker")?.setAttribute("max", this.maxDate!);
  }

  public static getMinDate(): string{
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 99);
    const day = this.insertZero(currentDate.getDate().toString());
    const month = this.insertZero((currentDate.getMonth() + 1).toString());
    const year = currentDate.getFullYear().toString();
    return year + '-' + month + '-' + day;
  }
  public static getMaxDate(): string{
    const currentDate = new Date();
    const day = this.insertZero(currentDate.getDate().toString());
    const month = this.insertZero((currentDate.getMonth() + 1).toString());
    const year = currentDate.getFullYear().toString();
    return year + '-' + month + '-' + day;
  }
  public static getMaxDatePlusYears(pYears: number): string{
    const currentDate = new Date();
    const day = this.insertZero(currentDate.getDate().toString());
    const month = this.insertZero((currentDate.getMonth() + 1).toString());
    let year = currentDate.getFullYear();
    year = year + pYears;
    return year.toString() + '-' + month + '-' + day;
  }
  private static insertZero(val: string){
    return val.length === 1 ? '0' + val : val;
  }

  changeDate(){
    const val = this.validateYear(this.parentForm.get(this.keyInput)?.value); 
    if(val){
      const minYear = this.minDate?.substr(0, 4);
      const maxYear = this.maxDate?.substr(0, 4);
      const valYear = val.substr(0, 4);
      const date = val.substr(4, 12);
      if(valYear < minYear!){
        this.parentForm.get(this.keyInput)?.setValue(minYear + date);
      }
      if(valYear > maxYear!){
        this.parentForm.get(this.keyInput)?.setValue(maxYear + date);
      }
    }
  }
  validateYear(val: any):any{
    const split:string[] = val?.split('-');
    if (split){
      if(split[0].length == 4)
      return val;
    const date = split[0].substring(0,4) + '-' + split[1] + '-' + split[2];
    this.parentForm.get(this.keyInput)?.setValue(date)
    return date;
    }
  }
}
