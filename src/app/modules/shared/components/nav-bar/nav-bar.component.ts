import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() tabletResolution: boolean = false;
  public isMenuCollapsed = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
