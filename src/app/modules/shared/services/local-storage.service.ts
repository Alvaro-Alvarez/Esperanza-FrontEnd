import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getBasClient(){
    return localStorage.getItem('basClient');
  }
  setBasClient(basClient: any){
    localStorage.setItem('basClient', JSON.stringify(basClient));
  }
  removeBasClient(){
    localStorage.removeItem('basClient');
  }
}
