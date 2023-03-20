import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {

  constructor(
    private modal: NgbActiveModal,
    private routing: RoutingService) { }

  ngOnInit(): void {
  }
  close(){
    this.modal.dismiss();
  }
  goToLogin(){
    this.routing.goToLogin();
    this.close();
  }
}
