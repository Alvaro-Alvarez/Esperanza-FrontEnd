import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowVideoModalComponent } from './show-video-modal/show-video-modal.component';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  @Input() video?: any;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }
  showVideo(){
    const modalRef = this.modalService.open(ShowVideoModalComponent, { size: 'lg' });
    modalRef.componentInstance.videoId = this.video.guid;
    modalRef.componentInstance.video = this.video;
  }
}
