import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoutingService } from '../../services/routing.service';
import { LaboratoryModalComponent } from './laboratory-modal/laboratory-modal.component';

@Component({
  selector: 'app-laboratory-card',
  templateUrl: './laboratory-card.component.html',
  styleUrls: ['./laboratory-card.component.scss']
})
export class LaboratoryCardComponent implements OnInit {

  @Input() laboratory?: any;

  constructor(
    private modalService: NgbModal,
    public routing: RoutingService,
    ) { }

  ngOnInit(): void {
  }
  showLab(){
    const modalRef = this.modalService.open(LaboratoryModalComponent, { size: 'lg' });
    modalRef.componentInstance.laboratory = this.laboratory;
  }
  gotoProductLab(){
    this.routing.goToProductLaboratory(this.laboratory?.laboratoryTitle?.toLowerCase());
  }
}
