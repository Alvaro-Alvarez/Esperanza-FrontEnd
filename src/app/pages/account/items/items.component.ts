import { Component, OnInit } from '@angular/core';
import { RoleEnum } from 'src/app/core/helpers/role-helper';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  userActive = false;
  isUserAdmin = false;

  constructor(
    public routing: RoutingService,
    private authService: AuthService
    ) {
      this.userActive = this.authService.getToken() ? true: false;
      this.isUserAdmin = this.authService.getRole() === RoleEnum.admin;
    }

  ngOnInit(): void {
  }
}
