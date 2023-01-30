import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  clientBas: any;

  constructor(
    public routing: RoutingService,
    private localStorageService: LocalStorageService
    ) { }

  ngOnInit(): void {
    this.fillUserLogged();
  }
  fillUserLogged(){
    const clientBas = this.localStorageService.getBasClient();
    if (clientBas) this.clientBas = JSON.parse(clientBas);
  }
  goToPurchases(){
    console.log('goToPurchases');
  }
}
