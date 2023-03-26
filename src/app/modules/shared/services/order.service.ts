import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItems } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl: string = environment.apiUrl + 'Order/';

  constructor(
    private http: HttpClient
  ) { }

  finishOrder(order: OrderItems): Observable<any>{
    debugger
    return this.http.post<any>(`${this.apiUrl}`, order);
  }
}
