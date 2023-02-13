import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  private apiUrl: string = environment.apiUrl + 'Laboratory/';

  constructor(
    private http: HttpClient
  ) { }
  
  getAll(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getTopFive(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}GetTopFive`);
  }
  getAllWithPagination(pagination: any): Observable<any[]>{
    return this.http.post<any[]>(`${this.apiUrl}GetAllWithPagination`, pagination);
  }
  getById(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetById/${id}`);
  }
  post(laboratory: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, laboratory);
  }
  put(laboratory: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}`, laboratory);
  }
  delete(id: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }
}
