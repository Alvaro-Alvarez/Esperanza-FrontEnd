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
import { forkJoin, Observable } from 'rxjs';
import { CarruselService } from '../../modules/shared/services/carrusel.service';
import { PageTypeEnum } from 'src/app/core/enums/page-type.enum';
import { LaboratoryModalComponent } from 'src/app/modules/shared/components/laboratory-card/laboratory-modal/laboratory-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoPopupComponent } from './info-popup/info-popup.component';
import { BasService } from 'src/app/modules/shared/services/bas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalRows?: number = 0;
  daysToExpiring = 10;
  filterForm!: FormGroup;
  updatingFilters = false;
  isUserAdmin = false;
  activeUser = false;
  products: any[] = [];
  videos: any[] = [];
  laboratories: any[] = [];
  carouselSlides: any[] = [];
  enableCarousel = false;
  noUserClientCode = '001';
  recommendedProducts: any[] = [];
  promotions : any[] = [];
  expiringPromotions : any[] = [];

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
    private modalService: NgbModal,
    private basService: BasService
  ) {
    this.isUserAdmin = this.authService.getRole() === RoleEnum.admin;
    this.activeUser = this.authService.activeUser();
    this.filterForm = this.formSerivce.getFormProductFilter();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getVideos();
    this.getRecommended();
    this.getPromotions();
    this.getLaboratories();
    this.loadPagesSlides();
    if (!this.activeUser) this.showModal();
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
      // this.alert.error('Ocurrió un error al tratar obtener los productos');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
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
      // this.alert.error('Ocurrió un error al tratar obtener los videos');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getLaboratories(){
    this.laboratoryService.getTopFive().subscribe(res => {
      this.spinner.hide();
      this.laboratories = res;
    }, err => {
      this.spinner.hide();
      console.log(err);
      // this.alert.error('Ocurrió un error al tratar obtener los laboratorios');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
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
  }
  goToLaboratory(lab: any){
    const modalRef = this.modalService.open(LaboratoryModalComponent, { size: 'lg' });
    modalRef.componentInstance.laboratory = lab;
  }
  goToRecommendeds(){
    this.routing.goToBestSellers();
  }
  goToOffers(){
    this.routing.goToOffers();
  }
  goToExpiringOffers(){
    this.routing.goToExpiringOffers();
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
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  showModal(){
    const modalRef = this.modalService.open(InfoPopupComponent, { 
      size: 'md',
      modalDialogClass: 'info-popup-modal',
      animation: true,
      backdrop : 'static',
      centered: true
    });
    // const modalRef = this.modalService.open(InfoPopupComponent, { size: 'md', modalDialogClass: 'info-popup-modal', windowClass: 'info-popup-modal2' });
    // const modalRef = this.modalService.open(InfoPopupComponent, { size: 'md', windowClass: 'info-popup-modal' });
  }
  getRecommended(){
    this.spinner.show();
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    let clientCode: string = clientBas ? clientBas.Codigo : this.noUserClientCode;
    this.basService.GetRecommendedProducts(clientCode).subscribe(res => {
      this.spinner.hide();
      // console.log(res);
      res?.sort((a: any,b: any) => a.RANKING - b.RANKING);
      // if (res?.length > 5) res = res.slice(0, 5)
      const codes = res?.map((a: any) => a.CODIGOS);
      for(let i = 0; i < codes?.length; i++){
        const arr = codes[i].split('|');
        if (arr.length > 1) codes[i] = arr[0];
      }
      this.getRecommendedProducts(codes);
    }, err =>{
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    })
  }
  getRecommendedProducts(productCodes: string[]){
    this.spinner.show();
    this.productService.getAllRecommended({productCodes: productCodes}).subscribe(res => {
      this.spinner.hide();
      this.recommendedProducts = res.products;
      if (this.recommendedProducts.length > 5){
        this.recommendedProducts = this.recommendedProducts.splice(0, 5);
      }
    }, err =>{
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    })
  }
  getPromotions(){
    this.spinner.show();
    const conditions = [];
    const obs: Observable<any>[] = [];
    if (this.localStorageService.canCcb()) conditions.push('CCB');
    if (this.localStorageService.canCcm()) conditions.push('CCM');
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    const clientCode: string = clientBas?.Codigo ? clientBas?.Codigo : this.noUserClientCode;
    conditions.forEach(condition => {
      obs.push(this.basService.getAllPromotions(clientCode, condition))
    });
    forkJoin(obs).subscribe(arrOptions => {
      this.spinner.hide();
      arrOptions.forEach(opts => {
        opts.forEach((opt: any) => {
          const currentDate = new Date();
          const to = new Date(opt?.VigenciaDesde);
          const from = new Date(opt?.VigenciaHasta);
          if (currentDate >= to && currentDate <= from){
            const daysDiff = this.getDaysDiff(new Date(), new Date(opt?.VigenciaHasta));
            if (daysDiff <= this.daysToExpiring){
              if (this.expiringPromotions.length < 5){
                this.expiringPromotions.push(opt);
              }
            }
          }
        });
        opts.forEach((opt: any) => {
          const currentDate = new Date();
          const to = new Date(opt?.VigenciaDesde);
          const from = new Date(opt?.VigenciaHasta);

          if (currentDate >= to && currentDate <= from){
            if (this.promotions.length < 5){
              this.promotions.push(opt);
            }
          }
        });
      });
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getDaysDiff(to: Date, from: Date): number{
    const date1: any = to;
    const date2: any = from;
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  goToOffer(promotion: any){
    this.routing.goToOfferDescription(promotion?.Categoria, promotion?.Codigo);
  }
}
