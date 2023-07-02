import { Component, HostListener, OnInit } from '@angular/core';
import { VideoService } from '../../modules/shared/services/video.service';
import { SpinnerService } from '../../modules/shared/services/spinner.service';
import { SweetAlertService } from '../../modules/shared/services/sweet-alert.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { EventService } from 'src/app/modules/shared/services/event.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  
  videos: any[] = [];
  rows: number = 0;
  breadcrumbs: Breadcrumb[]= [];
  mobile = false;

  constructor(
    private videoService: VideoService,
    private spinnerService: SpinnerService,
    private alertService: SweetAlertService,
    private localStorageService: LocalStorageService,
    private eventService: EventService,
  ) {
    this.checkResolution();
    this.insertBreadcrumb();
  }

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
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alertService.error(error);
    })
  }
  reSearchItemsPagination(eve :any){
    this.getVideos(eve[0]);
  }
  insertBreadcrumb(){
    this.localStorageService.setBreadcrumbs(new Breadcrumb('Video promocionales', `videos`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
  checkResolution(){
    if(window.innerWidth < 821) this.mobile = true;
    else this.mobile = false;
  }
}
