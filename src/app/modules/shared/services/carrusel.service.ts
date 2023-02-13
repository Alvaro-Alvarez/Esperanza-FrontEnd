import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarruselService {

  private apiUrl: string = environment.apiUrl + 'Carousel/';

  constructor(
    private http: HttpClient
  ) { }
  
  getAll(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getById(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetById/${id}`);
  }
  getByPageType(pageType: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetByPageType/${pageType}`);
  }
  post(carousel: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, carousel);
  }
  put(carousel: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}`, carousel);
  }
  delete(id: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }
}
