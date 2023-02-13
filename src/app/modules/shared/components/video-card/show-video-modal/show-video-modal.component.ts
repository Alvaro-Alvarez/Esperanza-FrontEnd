import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-show-video-modal',
  templateUrl: './show-video-modal.component.html',
  styleUrls: ['./show-video-modal.component.scss']
})
export class ShowVideoModalComponent implements OnInit {

  @Input() videoId?: string;
  @Input() video?: any;
   fullVideo?: any;
  
  constructor(
    private videoService: VideoService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    public modal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
    this.getVideo();
  }
  getVideo(){
    this.spinner.show();
    this.videoService.getById(this.videoId!).subscribe(res => {
      this.spinner.hide();
      this.fullVideo = res;
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al tratar obtener el video');
    });
  }
  videoPath(name: string){
    const path = 'assets/promotional-videos/' + name;
    return path;
  }
  close(){
    this.modal.dismiss();
  }
}
