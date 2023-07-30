import { EventEmitter, Injectable } from '@angular/core';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public onLogIn = new EventEmitter<boolean>();
  public onLogOut = new EventEmitter<boolean>();
  public onSearchProduct = new EventEmitter<string>();
  public onNewSearchProduct = new EventEmitter<any>();
  public onShoppingCartAction = new EventEmitter<boolean>();
  public onSearchOtherTypeProduct = new EventEmitter<string>();
  public onShowBreadcrumbs = new EventEmitter<Breadcrumb[]>();


  public onShowFilter = new EventEmitter<any>();
  public onSendDataToFilters = new EventEmitter<any>();
  public onClearFilters = new EventEmitter<any>();
  public onUpdateCategories = new EventEmitter<any>();
  constructor() { }
}
