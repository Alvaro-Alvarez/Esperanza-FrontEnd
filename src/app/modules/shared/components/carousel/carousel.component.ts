import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images: any[] = [
    {path: 'assets/test-carousel/1.jpg', pathPhone: 'assets/test-carousel/1.jpg'},
    {path: 'assets/test-carousel/2.png', pathPhone: 'assets/test-carousel/2.png'}
  ]
  positionImageCarousel: number = 0;
  interval: any;
  phoneResolution = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }

  constructor() { }

  ngOnInit(): void {
    this.startTimerData();
    this.checkResolution();
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  next(manual: boolean = false){
    this.positionImageCarousel = this.positionImageCarousel -100;
    if (((this.images.length*100) - (this.images.length*100)*2) === this.positionImageCarousel)
      this.positionImageCarousel = 0;
    if (manual) this.restertInterval();
  }
  prev(manual: boolean = false){
    this.positionImageCarousel = this.positionImageCarousel +100;
    if (this.positionImageCarousel > 0){
      this.positionImageCarousel = (((this.images.length-1)*100) - ((this.images.length-1)*100)*2);
    if (manual) this.restertInterval();
    }
  }
  startTimerData() {
    this.interval = setInterval(() => {
      this.next();
    }, 5000)
  }
  goToAdd(path: string){
    console.log(path);
  }
  restertInterval(){
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.startTimerData();
  }
  checkResolution(){
    if(window.innerWidth < 767) this.phoneResolution = true;
    else this.phoneResolution = false;
  }
}
