import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RoleEnum } from './core/helpers/role-helper';
import { AuthGuard } from './modules/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'product/:productId',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin, RoleEnum.client] }
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'customer-products/:search/:condition',
    loadChildren: () => import('./pages/customer-products/customer-products.module').then( m => m.CustomerProductsModule)
    // canActivate: [AuthGuard], data: { roles: [RoleEnum.client] }
  },
  {
    path: 'orders-placed',
    loadChildren: () => import('./pages/orders-placed/orders-placed.module').then( m => m.OrdersPlacedModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.client] }
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./pages/add-edit-products/add-edit-products.module').then( m => m.AddEditProductsModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'users/:id',
    loadChildren: () => import('./pages/add-edit-user/add-edit-user.module').then( m => m.AddEditUserModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'product-description/:code',
    loadChildren: () => import('./pages/product-description/product-description.module').then( m => m.ProductDescriptionModule),
    // canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'video-admin',
    loadChildren: () => import('./pages/video/video.module').then( m => m.VideoModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'carousel-admin',
    loadChildren: () => import('./pages/carousel/carousel.module').then( m => m.CarouselModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'laboratory-admin',
    loadChildren: () => import('./pages/laboratory/laboratory.module').then( m => m.LaboratoryModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'add-edit-video/:id',
    loadChildren: () => import('./pages/add-edit-video/add-edit-video.module').then( m => m.AddEditVideoModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'add-edit-carousel/:id',
    loadChildren: () => import('./pages/add-edit-carousel/add-edit-carousel.module').then( m => m.AddEditCarouselModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'add-edit-laboratory/:id',
    loadChildren: () => import('./pages/add-edit-laboratory/add-edit-laboratory.module').then( m => m.AddEditLaboratoryModule),
    canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] }
  },
  {
    path: 'product-laboratory/:laboratory',
    loadChildren: () => import('./pages/product-laboratory/product-laboratory.module').then( m => m.ProductLaboratoryModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./pages/videos/videos.module').then( m => m.VideosModule)
  },
  {
    path: 'laboratories',
    loadChildren: () => import('./pages/laboratories/laboratories.module').then( m => m.LaboratoriesModule)
  },
  {
    path: 'documents-ctacte',
    loadChildren: () => import('./pages/documents-ctacte/documents-ctacte.module').then( m => m.DocumentsCtacteModule)
  },


  {
    path: 'best-sellers',
    loadChildren: () => import('./pages/best-sellers/best-sellers.module').then( m => m.BestSellersModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then( m => m.OffersModule)
  },
  {
    path: 'offer-description/:condition/:code',
    loadChildren: () => import('./pages/offer-description/offer-description.module').then( m => m.OfferDescriptionModule)
  },
  {
    path: 'expiring-offers',
    loadChildren: () => import('./pages/expiring-offers/expiring-offers.module').then( m => m.ExpiringOffersModule)
  },
  {
    path: 'vademecums',
    loadChildren: () => import('./pages/vademecums/vademecums.module').then( m => m.VademecumsModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactModule)
  },
  {
    path: 'essays-and-services',
    loadChildren: () => import('./pages/essays-and-services/essays-and-services.module').then( m => m.EssaysAndServicesModule)
  },
  { 
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
