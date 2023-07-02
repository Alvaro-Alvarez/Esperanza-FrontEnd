import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { TitlecaseDirective } from './directives/titlecase.directive';
import { NumberDirective } from './directives/number.directive';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';
import { CheckComponent } from './form-components/check/check.component';
import { DatepickerComponent } from './form-components/datepicker/datepicker.component';
import { NumberComponent } from './form-components/number/number.component';
import { RadioComponent } from './form-components/radio/radio.component';
import { SelectComponent } from './form-components/select/select.component';
import { TextareaComponent } from './form-components/textarea/textarea.component';
import { TextComponent } from './form-components/text/text.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableComponent } from './components/table/table.component';
import { TitleComponent } from './components/title/title.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AddImagesComponent } from './components/add-images/add-images.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NumberCustomComponent } from './form-components/number-custom/number-custom.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { LaboratoryComponent } from './components/laboratory/laboratory.component';
import { CardPromotionComponent } from './components/card-promotion/card-promotion.component';
import { LaboratoryCardComponent } from './components/laboratory-card/laboratory-card.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { ShowVideoModalComponent } from './components/video-card/show-video-modal/show-video-modal.component';
import { ImageComponent } from './components/image/image.component';
import { VideoComponent } from './components/video/video.component';
import { LaboratoryModalComponent } from './components/laboratory-card/laboratory-modal/laboratory-modal.component';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';



@NgModule({
  declarations: [
    TitlecaseDirective,
    NumberDirective,
    BlockCopyPasteDirective,
    CheckComponent,
    DatepickerComponent,
    NumberComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent,
    TextComponent,
    CarouselComponent,
    FooterComponent,
    HeaderComponent,
    NavBarComponent,
    SpinnerComponent,
    TableComponent,
    TitleComponent,
    AddImagesComponent,
    TopHeaderComponent,
    ProductCardComponent,
    NoItemsComponent,
    PaginationComponent,
    NumberCustomComponent,
    PromotionsComponent,
    LaboratoryComponent,
    CardPromotionComponent,
    LaboratoryCardComponent,
    VideoCardComponent,
    ShowVideoModalComponent,
    ImageComponent,
    VideoComponent,
    LaboratoryModalComponent,
    OfferCardComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    CurrencyMaskModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbModule,
    HttpClientModule
  ],
  exports: [
    CheckComponent,
    DatepickerComponent,
    NumberComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent,
    TextComponent,
    CarouselComponent,
    FooterComponent,
    HeaderComponent,
    NavBarComponent,
    SpinnerComponent,
    TableComponent,
    TitleComponent,
    AddImagesComponent,
    TopHeaderComponent,
    ProductCardComponent,
    NoItemsComponent,
    PaginationComponent,
    NumberCustomComponent,
    PromotionsComponent,
    LaboratoryComponent,
    LaboratoryCardComponent,
    VideoCardComponent,
    ImageComponent,
    VideoComponent,
    OfferCardComponent,
    BreadcrumbsComponent
  ],
  providers: [
    TitleCasePipe,
    CurrencyPipe
  ]
})
export class SharedModule { }
