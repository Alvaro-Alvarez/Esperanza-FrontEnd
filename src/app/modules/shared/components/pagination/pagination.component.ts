import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';

export class Pagination{
  active: boolean;
  hidden: boolean;
  constructor(_active: boolean, _hidden: boolean){
    this.active = _active;
    this.hidden = _hidden;
  }
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  
  sub: Subscription;
  rows: number = 10;
  pages: Array<Pagination> = [];
  pageActive: number = 1;
  visiblePages: number = 5;
  hiddenMorePreview = true;
  hiddenMoreNext = true;
  mobile = false;
  @Input() totalRows: number = 0;
  @Output() reSearchItemsPagination: EventEmitter<[number,number]> = new EventEmitter();
  
  constructor(private eventService: EventService) {
    this.checkResolution();
    this. sub = this.eventService.onNewSearchProduct.subscribe((val: any) => {
      if(val){
        this.pageActive = 1;
        this.totalRows = val.rows;
        this.pages = [];
        this.initPages();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.initPages();
  }
  searchItems(){
    const start = ((this.pageActive+1) * this.rows) - this.rows;
    const end = ((this.pageActive+1) * this.rows) - 1;
    this.reSearchItemsPagination.emit([start, end]);
  }
  initPages(){
    const numberPages = (this.totalRows / this.rows) < 1 ? 1 : (this.totalRows / this.rows);
    for (let i = 0; i < numberPages; i++)
      this.pages.push(new Pagination(false, false));
    this.pages[0].active = true;
    this.pageActive = 0;
    this.pagesToSee();
  }
  pagesToSee(){
    if (this.pages.length > this.visiblePages){
      if ((this.pageActive+1) >= this.visiblePages) this.hiddenMorePreview = false;
      else this.hiddenMorePreview = true;
      if ((this.pageActive+2) >= this.pages.length) this.hiddenMoreNext = true;
      else this.hiddenMoreNext = false;
      this.hiddenAll();
      this.showRange();
    }
  }
  onClickPage(index: number){
    if (this.totalRows > this.rows){
      this.cleanActives();
      this.pages[index].active = true;
      this.pageActive = index;
      this.pagesToSee();
      this.searchItems();
    }
  }
  onClickNext(){
    if (this.totalRows > this.rows){
      this.cleanActives();
      const pageActive = (this.pageActive+1) > (this.pages.length-1) ? this.pages.length-1 : this.pageActive+1;
      this.pages[pageActive].active = true;
      this.pageActive = pageActive;
      this.pagesToSee();
      this.searchItems();
    }
  }
  onClickPreview(){
    if (this.totalRows > this.rows){
      this.cleanActives();
      const pageActive = (this.pageActive-1) < 0 ? 0 : (this.pageActive-1);
      this.pages[pageActive].active = true;
      this.pageActive = pageActive;
      this.pagesToSee();
      this.searchItems();
    }
  }
  onClickFirst(){
    if (this.totalRows > this.rows){
      this.cleanActives();
      this.pages[0].active = true;
      this.pageActive = 0;
      this.pagesToSee();
      this.searchItems(); 
    }
  }
  onClickLast(){
    if (this.totalRows > this.rows){
      this.cleanActives();
      this.pages[this.pages.length-1].active = true;
      this.pageActive = this.pages.length-1;
      this.pagesToSee();
      this.searchItems();
    }
  }
  cleanActives(){
    this.pages.map(page => {
      page.active = false;
    });
  }
  hiddenAll(){
    this.pages.map(page => {
      page.hidden = true;
    });
  }
  showRange(){
    switch((this.pageActive+1)){
      case 1: 
      case 2: 
      case 3: 
      case 4: for(let i = 0; i < 5; i++) this.pages[i].hidden = false; break;
      case this.pages.length :
        this.pages[(this.pageActive)-4].hidden = false; 
        this.pages[(this.pageActive)-3].hidden = false; 
        this.pages[(this.pageActive)-2].hidden = false; 
        this.pages[(this.pageActive)-1].hidden = false; 
        this.pages[(this.pageActive)].hidden = false;
      break;
      default:
        this.pages[(this.pageActive)-3].hidden = false; 
        this.pages[(this.pageActive)-2].hidden = false; 
        this.pages[(this.pageActive)-1].hidden = false; 
        this.pages[(this.pageActive)].hidden = false; 
        this.pages[(this.pageActive)+1].hidden = false; 
    }
  }
  checkResolution(){
    if(window.innerWidth < 821) this.mobile = true;
    else this.mobile = false;
  }
}
