import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.apiUrl + 'User';
  
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
  GetByGuid(guid: string): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/GetByGuid/${guid}`);
  }
  post(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}`, user);
  }
  put(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiUrl}`, user);
  }
  delete(userGuid: string): Observable<User>{
    return this.http.delete<User>(`${this.apiUrl}/${userGuid}`);
  }
}
