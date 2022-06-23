import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    public routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.spinner.show();
    this.userService.getAll().subscribe(res => {
      this.users = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener usuarios');
    });
  }
  askAction(id: string){
    this.alert.warning('Cuidado!', 'Estas por eliminar un usuario, estás de acuerdo?', ()=>{this.deleteUser(id)})
  }
  deleteUser(id: string){
    this.spinner.show();
    this.userService.delete(id).subscribe(res => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de eliminar el usuario');
    });
  }
}
