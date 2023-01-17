import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credentials } from 'src/app/core/models/credentials';
import { Observable } from 'rxjs';
import { AccessToken } from 'src/app/core/models/access-token';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl + 'Auth';
  
  constructor(
    private http: HttpClient
  ) { }

  login(credentials: Credentials): Observable<AccessToken>{
    return this.http.post<AccessToken>(`${this.apiUrl}`, credentials);
  }
  logout() {
    localStorage.removeItem('token');
  }
  setToken(accessToken: AccessToken){
    localStorage.setItem('token', accessToken.token);
  }
  getToken(){
    return localStorage.getItem('token')!;
  }
  getRole(){
    const token = localStorage.getItem('token')!;
    if (!token) return null;
    const payload: any = jwt_decode(token);
    return payload['role'];
  }
  getUserId(){
    const token = localStorage.getItem('token')!;
    if (!token) return null;
    const payload: any = jwt_decode(token);
    return payload['unique_name'];
  }
}
