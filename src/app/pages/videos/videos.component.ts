import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../modules/shared/services/video.service';
import { SpinnerService } from '../../modules/shared/services/spinner.service';
import { SweetAlertService } from '../../modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  videos: any[] = [];
  rows: number = 0;

  constructor(
    private videoService: VideoService,
    private spinnerService: SpinnerService,
    private alertService: SweetAlertService,
  ) { }

  ngOnInit(): void {
    this.getVideos(0);
  }
  getVideos(pag: number){
    this.spinnerService.show();
    this.videoService.getAllWithPagination({start: pag}).subscribe(res => {
      this.spinnerService.hide();
      this.videos = res;
      this.rows = res.length > 0 ? res[0].rows : 0;
    }, err => {
      this.spinnerService.hide();
      this.alertService.error('Error al obtener los videos');
    })
  }
  reSearchItemsPagination(eve :any){
    this.getVideos(eve[0]);
  }
}
