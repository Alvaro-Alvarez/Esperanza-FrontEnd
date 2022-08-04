import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFilter } from 'src/app/core/models/product-filter';
import { ProductResponse } from 'src/app/core/models/product-response';
import { environment } from 'src/environments/environment';
import { Product } from '../../../core/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = environment.apiUrl + 'Product/';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }
  getByGuid(guid: string): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/GetByGuid/${guid}`);
  }
  getAllByFilter(filter: ProductFilter): Observable<ProductResponse>{
    return this.http.post<ProductResponse>(`${this.apiUrl}GetAllWithPagination`, filter);
  }
  post(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }
  put(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}`, product);
  }
  delete(productGuid: string): Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}/${productGuid}`);
  }
}
