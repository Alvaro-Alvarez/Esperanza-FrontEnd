import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Option } from '../../../core/models/option';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl: string = environment.apiUrl + 'Role';
  
  constructor(
    private http: HttpClient
  ) { }

  GetByGuid(guid: string): Observable<Option>{
    return this.http.get<Option>(`${this.apiUrl}/GetByGuid/${guid}`);
  }
  post(role: Option): Observable<Option>{
    return this.http.post<Option>(`${this.apiUrl}`, role);
  }
  put(role: Option): Observable<Option>{
    return this.http.put<Option>(`${this.apiUrl}`, role);
  }
  delete(roleGuid: string): Observable<Option>{
    return this.http.delete<Option>(`${this.apiUrl}/${roleGuid}`);
  }
}
