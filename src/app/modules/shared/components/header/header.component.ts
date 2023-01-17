import { Component, Input, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { MasterDataService } from '../../services/master-data.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {

  @Input() tabletResolution: boolean = false;
  // menuClicked = false;

  constructor(
    public nav :RoutingService,
    config: NgbDropdownConfig,
    private masterDataService: MasterDataService
  ) {
    // config.autoClose = false;
  }

  ngOnInit(): void {
  }
  goToVademecum(){
    this.masterDataService.getSexs().subscribe(res => {

    });
    console.log("Vademecum");
  }
  goToNotifications(){
    console.log("Notificaciones");
  }
  goToUser(){
    console.log("Usuario");
  }
  search(){
    console.log("Busqueda");
  }
  goToHome(){
    this.nav.goToHome();
  }
}
