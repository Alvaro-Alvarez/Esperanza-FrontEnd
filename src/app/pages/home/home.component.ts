import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { ProductFilter } from 'src/app/core/models/product-filter';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { RoleEnum } from 'src/app/core/helpers/role-helper';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { VideoService } from '../../modules/shared/services/video.service';
import { LaboratoryService } from '../../modules/shared/services/laboratory.service';
import { forkJoin } from 'rxjs';
import { CarruselService } from '../../modules/shared/services/carrusel.service';
import { PageTypeEnum } from 'src/app/core/enums/page-type.enum';
import { LaboratoryModalComponent } from 'src/app/modules/shared/components/laboratory-card/laboratory-modal/laboratory-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalRows?: number = 0;
  filterForm!: FormGroup;
  updatingFilters = false;
  isUserAdmin = false;
  products: any[] = [];
  videos: any[] = [];
  laboratories: any[] = [];
  carouselSlides: any[] = [];
  enableCarousel = false;

  constructor(
    private videoService: VideoService,
    private laboratoryService: LaboratoryService,
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private formSerivce: FormService,
    public routing: RoutingService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private carruselService: CarruselService,
    private modalService: NgbModal
  ) {
    this.isUserAdmin = this.authService.getRole() === RoleEnum.admin;
    this.filterForm = this.formSerivce.getFormProductFilter();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getVideos();
    this.getLaboratories();
    this.loadPagesSlides();
  }
  getProducts(){
    this.spinner.show();
    this.productService.GetTopFive().subscribe(res => {
      this.spinner.hide();
      this.products = res.products;
      this.totalRows = res.rows;
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al tratar obtener los productos');
    });
  }
  getVideos(){
    this.spinner.show();
    this.videoService.getTopFive().subscribe(res => {
      this.spinner.hide();
      this.videos = res;
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al tratar obtener los videos');
    });
  }
  getLaboratories(){
    this.laboratoryService.getTopFive().subscribe(res => {
      this.spinner.hide();
      this.laboratories = res;
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al tratar obtener los laboratorios');
    });
  }
  updatingFilter(value: boolean){
    this.updatingFilters = value;
  }
  goToAllOffers(){
    const condition = this.localStorageService.getConditionToRouting();
    this.routing.goCustomerToProducs('0', condition!);
  }
  goToMoreSeelers(){
    console.log("Más vendidos");
  }
  goToLaboratory(lab: any){
    const modalRef = this.modalService.open(LaboratoryModalComponent, { size: 'lg' });
    modalRef.componentInstance.laboratory = lab;
  }
  goToProduct(code: string){
    this.routing.goToProductDescription(code);
  }
  loadPagesSlides(){
    this.spinner.show();
    let obs = [];
    obs.push(this.carruselService.getByPageType(PageTypeEnum.Default));
    obs.push(this.carruselService.getByPageType(PageTypeEnum.Home));
    forkJoin(obs).subscribe(arrOptions => {
      this.spinner.hide();
      if (arrOptions[1]){ // HOME
        this.carouselSlides.push(...arrOptions[1].slides);
        this.enableCarousel = arrOptions[1].enable;
      }
      else if (arrOptions[0]){ // DEFAULT
        this.carouselSlides.push(...arrOptions[0].slides);
        this.enableCarousel = arrOptions[0].enable;
      }
    }, err =>{
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener diapositivas del carrusel');
    });
  }
}
