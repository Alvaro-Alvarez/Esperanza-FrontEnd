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
  getConditionToRouting(){
    let client: any;
    const clientStr = this.getBasClient();
    if (clientStr){
      client = JSON.parse(clientStr);
      let ccm = client?.CondicionVentaMedicamentos;
      let ccb = client?.CondicionVentaBalanceado;
      if (ccm && ccb) return '0';
      else if (ccb) return 'CCB';
      else if (ccm) return 'CCM';
    }
    return '0';
  }
  canCcb(): boolean{
    let client: any;
    const clientStr = this.getBasClient();
    if (clientStr){
      client = JSON.parse(clientStr);
      let ccb = client?.CondicionVentaBalanceado;
      return ccb != null && ccb != undefined && ccb != '';
    }
    return false;
  }
  canCcm(): boolean{
    let client: any;
    const clientStr = this.getBasClient();
    if (clientStr){
      client = JSON.parse(clientStr);
      let ccm = client?.CondicionVentaMedicamentos;
      return ccm != null && ccm != undefined && ccm != '';
    }
    return false;
  }
}

