import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  
  title = 'Esperanza-FrontEnd';
  tabletResolution = false;

  constructor(){
    this.checkResolution();
  }

  checkResolution(){
    if(window.innerWidth < 821)
      this.tabletResolution = true;
    else
      this.tabletResolution = false;
  }
}
