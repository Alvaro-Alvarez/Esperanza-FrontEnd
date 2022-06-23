import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public onLogIn = new EventEmitter<boolean>();
  public onLogOut = new EventEmitter<boolean>();
  constructor() { }
}
