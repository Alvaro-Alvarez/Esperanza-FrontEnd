import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private datePipe: DatePipe) { }
  setDate(value: any){
    if(!value) return null;
    return this.datePipe.transform(value, 'yyyy-MM-dd')?.toString();
  }
}
