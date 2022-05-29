import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/pages/login-register/login/login.component';
import { RegisterComponent } from 'src/app/pages/login-register/register/register.component';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  @Input() tabletResolution: boolean = false;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }
  login() {
    const modalRef = this.modalService.open(LoginComponent, { size: "md" });
  }
  register(){
    const modalRef = this.modalService.open(RegisterComponent, { size: "md" });
  }
}
