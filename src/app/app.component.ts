import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Breadcrumb } from './core/models/breadcrumbs';
import { Subscription } from 'rxjs';
import { EventService } from './modules/shared/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset >= this.stickyOffSet) this.addStickyClass = true;
    else this.addStickyClass = false;
  }
  addStickyClass = false;
  stickyOffSet = 0;
  navHeight = 0;
  title = 'Esperanza-FrontEnd';
  tabletResolution = false;
  breadcrumbsSub: Subscription;
  breadcrumbs: Breadcrumb[]= [];
  recapchaKey: string;
  whatsappNumber: string;
  whatsappText: string;

  constructor(private eventService: EventService){
    this.checkResolution();
    this.breadcrumbsSub = this.eventService.onShowBreadcrumbs.subscribe(val => {
      this.breadcrumbs = val;
    });
    this.recapchaKey = environment.recapchaSiteKey;
    this.whatsappNumber = environment.whatsappNumberFloat;
    this.whatsappText = environment.whatsappText;
  }

  checkResolution(){
    if(window.innerWidth < 821)
      this.tabletResolution = true;
    else
      this.tabletResolution = false;
  }
  ngOnInit(): void {
    let navbar = document.getElementById("nav-bar");
    this.navHeight = navbar?.offsetHeight!;
    this.stickyOffSet = navbar?.offsetTop!;
  }
  ngOnDestroy(): void {
    if (this.breadcrumbsSub) this.breadcrumbsSub.unsubscribe();
  }
  scroll(event: any) {
    const element = document.getElementById(event);
    const y = (element!.getBoundingClientRect().top + window.pageYOffset) - this.navHeight;
    window.scrollTo({top: y, behavior: 'smooth'});
    /*Esta parte de código hace lo mismo que las 3 líneas de arriba, pero a la de arriba le pude restar el tamaño del navBar*/
    // document.getElementById(event)?.scrollIntoView();
  }
  scrollToTop() {
    // Desplaza el scroll al inicio del documento
    document.body.scrollTop = 0; // Para navegadores Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
  }
}
