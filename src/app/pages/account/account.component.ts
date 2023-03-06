import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  clientBas: any;
  clientEsp: any;
  isUserAdmin = false;
  
  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if(this.isUserAdmin) this.getUserEsp();
    else this.fillUserLogged();
  }
  fillUserLogged(){
    const clientBas = this.localStorageService.getBasClient();
    if (clientBas) this.clientBas = JSON.parse(clientBas);
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
