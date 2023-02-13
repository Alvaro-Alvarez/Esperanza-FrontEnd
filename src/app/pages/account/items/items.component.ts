import { Component, OnInit } from '@angular/core';
import { RoleEnum } from 'src/app/core/helpers/role-helper';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { SpinnerService } from '../../../modules/shared/services/spinner.service';
import { SweetAlertService } from '../../../modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  userActive = false;
  isUserAdmin = false;
  clientBas: any;
  clientEsp: any;

  constructor(
    public routing: RoutingService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private userService: UserService,
    private spinner: SpinnerService,
    private alert: SweetAlertService
    ) {
      this.userActive = this.authService.getToken() ? true: false;
      this.isUserAdmin = this.authService.getRole() === RoleEnum.admin;
    }

  ngOnInit(): void {
    if(this.isUserAdmin) this.getUserEsp();
    else this.fillUserLogged();
  }
  fillUserLogged(){
    const clientBas = this.localStorageService.getBasClient();
    if (clientBas) this.clientBas = JSON.parse(clientBas);
  }
  goToPurchases(){
    console.log('goToPurchases');
  }
  getUserEsp(){
    this.spinner.show();
    const userId = this.authService.getUserId();
    this.userService.GetByGuid(userId).subscribe(res =>{
      this.spinner.hide();
      this.clientEsp = res;
      console.log(this.clientEsp);
    }, err =>{
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener el usuario');
      console.log(err);
    });
  }
}
