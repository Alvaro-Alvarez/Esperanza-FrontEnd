import { Component, OnInit } from '@angular/core';
import { RoleEnum } from 'src/app/core/helpers/role-helper';
import { MasterDataService } from 'src/app/modules/shared/services/master-data.service';
import { RoleService } from 'src/app/modules/shared/services/role.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { Option } from '../../core/models/option';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: Option[] = [];
  roleEnum = RoleEnum;
  
  constructor(
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    public routingService: RoutingService,
    private masterDataService: MasterDataService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }
  getRoles(){
    this.spinner.show();
    this.masterDataService.getRoles().subscribe(res => {
      this.roles = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar de obtener los roles');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  askAction(id: string){
    this.alert.warning('Cuidado!', 'Estas por eliminar un rol, estás de acuerdo?', ()=>{this.deleteUser(id)})
  }
  deleteUser(id: string){
    this.spinner.show();
    this.roleService.delete(id).subscribe(res => {
      this.spinner.hide();
      this.getRoles();
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar de eliminar el rol');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
}
