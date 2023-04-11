import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiUrl: string = environment.apiUrl + 'Settings/';

  constructor(
    private http: HttpClient
  ) { }

  getLocations(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetEsperanzaLocations`);
  }
}
