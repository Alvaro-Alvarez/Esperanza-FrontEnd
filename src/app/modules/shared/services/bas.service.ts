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
  getSemaphoreData(code: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetSemaphoreData/${code}`);
  }
  getCarriers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetCarriers`);
  }
  GetDocumentosCtacte(clientCode: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetDocumentosCtacte/${clientCode}`);
  }
  GetRecommendedProducts(clientCode: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetRecommendedProducts/${clientCode}`);
  }
  GetEstadoPedidos(clientCode: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetEstadoPedidos/${clientCode}`);
  }
  getAllPromotions(clinetCode: string, condition: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetPromociones/${clinetCode}/${condition}`);
  }
  
  getVademecumAcciones(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetVademecumAcciones`);
  }
  getVademecumEspecies(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetVademecumEspecies`);
  }
  getVademecumAdministraciones(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetVademecumAdministraciones`);
  }
  getVademecumDrogras(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetVademecumDrogras`);
  }
}
