import { OnInit, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class SweetAlertService implements OnInit {
  constructor() {}
 
  ngOnInit() { }
  showMessage(err: boolean, title :any, msg :any, func?: Function){
    if (!err) this.error(msg);
    else this.successful(title, msg, func);
  }
  successful(title :any, msg :any, func?: Function){
    Swal.fire({
      title: title,
      text: msg,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok!'
    }).then((result) => {
      if (result.isConfirmed && func) {
        func?.call(this);
      }
    })
  }
  warning(title :any, msg :string, func?: Function){
    Swal.fire({
      title: title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        func?.call(this);
      }
    })
  }
  error(msg: any){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg
      })
  }
  info(title :any, msg :string, func?: Function){
    Swal.fire({
      title: title,
      text: msg,
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        func?.call(this);
      }
    })
  }
  infoWithCancel(title :any, msg :string, func?: Function){
    Swal.fire({
      title: title,
      text: msg,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        func?.call(this);
      }
    })
  }
}