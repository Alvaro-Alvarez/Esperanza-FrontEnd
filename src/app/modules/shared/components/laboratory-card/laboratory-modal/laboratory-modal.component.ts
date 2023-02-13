import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-laboratory-modal',
  templateUrl: './laboratory-modal.component.html',
  styleUrls: ['./laboratory-modal.component.scss']
})
export class LaboratoryModalComponent implements OnInit {

  @Input() laboratory?: any;
  
  constructor(
    public modal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
  }
  close(){
    this.modal.dismiss();
  }
}
