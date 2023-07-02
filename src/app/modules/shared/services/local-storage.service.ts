import { Injectable } from '@angular/core';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';

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
  getBreadcrumbs(): Breadcrumb[]{
    const breadcrumbsStr = localStorage.getItem('breadcrumbs');
    const breadcrumbs = breadcrumbsStr ? JSON.parse(breadcrumbsStr) : [];
    return breadcrumbs;
  }
  setBreadcrumbs(breadcrumb: Breadcrumb){
    let breadcrumbs = this.getBreadcrumbs();
    const names = breadcrumbs.map(b => b.name);
    if (names.includes(breadcrumb.name)){
      const index = names.indexOf(breadcrumb.name);
      breadcrumbs.splice(index+1, breadcrumbs.length);
      if (breadcrumb.name === 'Inicio'){
        breadcrumbs = [];
        breadcrumbs.push(new Breadcrumb('Inicio', 'home'));
      }
    }
    else breadcrumbs.push(breadcrumb);
    localStorage.removeItem('breadcrumbs');
    localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
  }
  removeBreadcrumbs(breadcrumb: Breadcrumb){
    const breadcrumbs = this.getBreadcrumbs();
    const index = breadcrumbs.indexOf(breadcrumb);
    breadcrumbs.splice(index, breadcrumbs.length);
    localStorage.removeItem('breadcrumbs');
    localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
  }
}

