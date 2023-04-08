import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl: string = environment.apiUrl + 'Contact/';

  constructor(
    private http: HttpClient
  ) { }

  sendMessage(contactMessage: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}SendMessage`, contactMessage);
  }
}
