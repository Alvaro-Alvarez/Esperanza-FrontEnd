import { OnInit, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class SweetAlertService implements OnInit {
  constructor() {}
 
  ngOnInit() { }
  // successful(msg :string){
  //   Swal.fire('Exelente! 😁', msg, 'success')
  // }
  successful(msg :string, func?: Function){
    Swal.fire({
      title: 'Exelente! 😁',
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
  warning(msg :string, func: Function){
    Swal.fire({
      title: 'Estás seguro de realizar esta acción? 😑',
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Segurísimo!',
      cancelButtonText: 'Mmm, mejor no'
    }).then((result) => {
      if (result.isConfirmed) {
        func.call(this);
      }
    })
  }
  error(){
    Swal.fire({
        icon: 'error',
        title: 'Oh no! 😵',
        text: 'Algo no salió bien, comuniquese con el administrador 😔'
      })
  }
}