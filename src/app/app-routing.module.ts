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
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
