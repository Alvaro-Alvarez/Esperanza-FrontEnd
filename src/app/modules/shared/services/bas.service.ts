import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasService {

  private apiUrl: string = environment.apiUrl + 'Bas/';

  constructor(
    private http: HttpClient
  ) { }
  
  getProduct(clientCode: string, productCode: string, condition: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}Product/${clientCode}/${productCode}/${condition}`);
  }
  getClient(code: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}Client/${code}`);
  }
}
