import { Component, HostListener, Input, OnInit } from '@angular/core';

export class ImageCarousel{
  imgB64?: string;
  text?: string;
  constructor(_imgB64: string, _text: string){
    this.imgB64 = _imgB64;
    this.text = _text;
  }
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() slides: any[] = [];
  imagesComputer: ImageCarousel[] = [];
  imagesMobile: ImageCarousel[] = [];
  positionImageCarousel: number = 0;
  interval: any;
  phoneResolution = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }

  constructor() { }

  ngOnInit(): void {
    this.formatSlides();
  }
  formatSlides(){
    const phoneSlides = this.slides.filter(s => s.isPhoneDimension);
    const pcSlides = this.slides.filter(s => !s.isPhoneDimension);
    phoneSlides.forEach(phoneSlide => {
      this.imagesMobile.push(new ImageCarousel(phoneSlide?.image?.base64Image, phoneSlide?.slideText))
    });
    pcSlides.forEach(pcSlide => {
      this.imagesComputer.push(new ImageCarousel(pcSlide?.image?.base64Image, pcSlide?.slideText))
    });
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
    if (((this.imagesComputer.length*100) - (this.imagesComputer.length*100)*2) === this.positionImageCarousel)
      this.positionImageCarousel = 0;
    if (manual) this.restertInterval();
  }
  prev(manual: boolean = false){
    this.positionImageCarousel = this.positionImageCarousel +100;
    if (this.positionImageCarousel > 0){
      this.positionImageCarousel = (((this.imagesComputer.length-1)*100) - ((this.imagesComputer.length-1)*100)*2);
    if (manual) this.restertInterval();
    }
  }

  nextPhone(manual: boolean = false){
    this.positionImageCarousel = this.positionImageCarousel -100;
    if (((this.imagesMobile.length*100) - (this.imagesMobile.length*100)*2) === this.positionImageCarousel)
      this.positionImageCarousel = 0;
    if (manual) this.restertInterval();
  }
  prevPhone(manual: boolean = false){
    this.positionImageCarousel = this.positionImageCarousel +100;
    if (this.positionImageCarousel > 0){
      this.positionImageCarousel = (((this.imagesMobile.length-1)*100) - ((this.imagesMobile.length-1)*100)*2);
    if (manual) this.restertInterval();
    }
  }


  startTimerData() {
    this.interval = setInterval(() => {
      this.next();
      this.nextPhone();
    }, 8000)
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
