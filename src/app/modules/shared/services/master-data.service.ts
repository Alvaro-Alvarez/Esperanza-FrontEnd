import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Option } from '../../../core/models/option';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  private apiUrl: string = environment.apiUrl + 'MasterData/';

  constructor(
    private http: HttpClient
  ) { }

  getDocuments(): Observable<Option[]>{
    return this.http.get<Option[]>(`${this.apiUrl}GetAllTypesOfDocuments`);
  }
  getSexs(): Observable<Option[]>{
    return this.http.get<Option[]>(`${this.apiUrl}GetAllSexs`);
  }
  getRoles(): Observable<Option[]>{
    return this.http.get<Option[]>(`${this.apiUrl}GetAllUserRoles`);
  }
  getPageTypes(): Observable<Option[]>{
    return this.http.get<Option[]>(`${this.apiUrl}GetPagesTypes`);
  }
  getConditionTypes(): Observable<Option[]>{
    return this.http.get<Option[]>(`${this.apiUrl}GetConditionTypes`);
  }
}
