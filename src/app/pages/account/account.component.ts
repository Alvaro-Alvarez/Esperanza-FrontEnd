import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user!: User;
  
  constructor(
    private authService: AuthService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(){
    this.spinner.show();
    const id = this.authService.getUserId();
    this.userService.GetByGuid(id).subscribe(res => {
      this.user = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar obtener el usuario');
    });
  }
}
