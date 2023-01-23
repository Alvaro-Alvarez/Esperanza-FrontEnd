import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(public routing: RoutingService) { }

  ngOnInit(): void {
  }

  goToPurchases(){
    console.log('goToPurchases');
  }
}
