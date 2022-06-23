import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/pages/login-register/login/login.component';
import { RegisterComponent } from 'src/app/pages/login-register/register/register.component';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  @Input() tabletResolution: boolean = false;

  constructor(
    private modalService: NgbModal,
    private routingService: RoutingService,
  ) { }

  ngOnInit(): void {
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
      console.log('se logea');
    })
  }
}
