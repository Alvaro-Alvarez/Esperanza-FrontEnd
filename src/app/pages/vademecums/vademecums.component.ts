import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PageTypeEnum } from 'src/app/core/enums/page-type.enum';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { CarruselService } from 'src/app/modules/shared/services/carrusel.service';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { BasService } from '../../modules/shared/services/bas.service';
import { LocalStorageService } from '../../modules/shared/services/local-storage.service';

@Component({
  selector: 'app-vademecums',
  templateUrl: './vademecums.component.html',
  styleUrls: ['./vademecums.component.scss']
})
export class VademecumsComponent implements OnInit {

  filterForm!: FormGroup;
  acciones: string[] = [];
  especies: string[] = [];
  administraciones: string[] = [];
  drogas: string[] = [];
  carouselSlides: any[] = [];
  enableCarousel = false;
  collapsed = false;
  totalRows: number = 0;
  products: any[] = [];
  noUserClientCode = '001';
  isUserLogged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private productService: ProductService,
    public routing: RoutingService,
    private authService: AuthService,
    private basService: BasService,
    private carruselService: CarruselService,
    private builder: FormBuilder,
    private localStorageService: LocalStorageService,
    private currencyPipe: CurrencyPipe,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadOptions();
    this.loadPagesSlides();
  }
  initForm(){
    this.filterForm = this.builder.group({
      accion: [null, []],
      especie: [null, []],
      administracion: [null, []],
      droga: [null, []]
    });
    this.initEvents();
  }
  initEvents(){
    this.filterForm.get('accion')?.valueChanges.subscribe(res => {
      this.reloadProducts(0);
    });
    this.filterForm.get('especie')?.valueChanges.subscribe(res => {
      this.reloadProducts(0);
    });
    this.filterForm.get('administracion')?.valueChanges.subscribe(res => {
      this.reloadProducts(0);
    });
    this.filterForm.get('droga')?.valueChanges.subscribe(res => {
      this.reloadProducts(0);
    });
  }
  loadOptions(){
    let obs: any[] = [];
    obs.push(this.basService.getVademecumAcciones());
    obs.push(this.basService.getVademecumEspecies());
    obs.push(this.basService.getVademecumAdministraciones());
    obs.push(this.basService.getVademecumDrogras());
    this.spinner.show();
    forkJoin(obs).subscribe((results: any[]) => {
      this.spinner.hide();
      this.acciones = results[0][0]?.ACCION;
      this.especies = results[1][0]?.LAB;
      this.administraciones = results[2][0]?.LAB;
      this.drogas = results[3][0]?.LAB;
    }, err =>{
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener las opciones');
    });
  }
  loadPagesSlides(){
    this.spinner.show();
    let obs = [];
    obs.push(this.carruselService.getByPageType(PageTypeEnum.Default));
    forkJoin(obs).subscribe(arrOptions => {
      this.spinner.hide();
      this.carouselSlides.push(...arrOptions[0].slides);
      this.enableCarousel = arrOptions[0].enable;
    }, err =>{
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener diapositivas del carrusel');
    });
  }
  changeIconFilter(){
    this.collapsed = !this.collapsed;
  }
  reloadProducts(start: number){
    debugger
    this.spinner.show();
    const conditions = [];
    if (this.localStorageService.canCcb()) conditions.push('CCB');
    if (this.localStorageService.canCcm()) conditions.push('CCM');
    const filter = {
      start: start,
      accion: this.filterForm.get('accion')?.value,
      especie: this.filterForm.get('especie')?.value,
      administracion: this.filterForm.get('administracion')?.value,
      droga: this.filterForm.get('droga')?.value,
      condiciones: conditions
    }
    this.productService.getByVademecumFilter(filter).subscribe(res => {
      this.spinner.hide();
      this.products = res.products!;
      this.totalRows = res.rows;
    }, err => {
      this.spinner.hide();
    });
  }
  goToProduct(code: string){
    this.routing.goToProductDescription(code);
  }
  getPrice(price: string){
    if (price){
      price = price.replace(',', '.');
      let money = Number(price);
      let moneyConverted = this.currencyPipe.transform(money, '$');
      return moneyConverted;
    }
    else return '0';
  }
  reSearchItemsPagination(event: any){
    this.reloadProducts(event[0]);
  }
}
