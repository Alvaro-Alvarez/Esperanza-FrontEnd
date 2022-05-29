import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() tabletResolution: boolean = false;
  
  constructor(
    public nav :RoutingService
  ) { }

  ngOnInit(): void {
  }

}
