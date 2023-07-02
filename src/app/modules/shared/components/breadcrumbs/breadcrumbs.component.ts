import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() breadcrumbs: Breadcrumb[] = [];

  constructor(private routingService: RoutingService) { }

  ngOnInit(): void {
  }
  nav(route: string){
    this.routingService.goToMenu(route);
  }
  goBack(){
    const breadcrumb = this.breadcrumbs[this.breadcrumbs.length-2];
    this.nav(breadcrumb.route);
  }
}
