import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { VideoService } from '../../modules/shared/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  videos: any[] = [];

  constructor(
    private videoService: VideoService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    public routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this.getVideos();
  }
  getVideos(){
    this.spinner.show();
    this.videoService.getAll().subscribe(res => {
      this.videos = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener videos');
    });
  }
  askAction(id: string){
    this.alert.warning('Cuidado!', 'Estas por eliminar un video, estás de acuerdo?', ()=>{this.deleteVideo(id)})
  }
  deleteVideo(id: string){
    this.spinner.show();
    this.videoService.delete(id).subscribe(res => {
      this.spinner.hide();
      this.getVideos();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de eliminar el video');
    });
  }
}
