import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/pages/login-register/login/login.component';
import { RegisterComponent } from 'src/app/pages/login-register/register/register.component';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit, OnDestroy {

  userActive = false;
  sub: Subscription;
  subLogout: Subscription;
  @Input() tabletResolution: boolean = false;

  constructor(
    private modalService: NgbModal,
    private routingService: RoutingService,
    private authService: AuthService,
    private eventService: EventService
  ) {
    this.sub = this.eventService.onLogIn.subscribe(res => {
      this.init();
    })
    this.subLogout = this.eventService.onLogOut.subscribe(res => {
      this.init();
    })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.subLogout) this.subLogout.unsubscribe();
  }
  ngOnInit(): void {
    this.init();
  }
  login() {
    const modalRef = this.modalService.open(LoginComponent, { size: "md" });
    modalRef.componentInstance.complete.subscribe((res: any) => {
      this.modalService.dismissAll();
      this.routingService.goToAccount();
    })
  }
  register(){
    const modalRef = this.modalService.open(RegisterComponent, { size: "md" });
    modalRef.componentInstance.complete.subscribe((res: any) => {
      this.modalService.dismissAll();
    })
  }
  init(){
    this.userActive = this.authService.getToken() ? true: false;
  }
}
