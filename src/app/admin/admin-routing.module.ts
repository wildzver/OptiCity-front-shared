import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {AddProductComponent} from './admin-products/add-product/add-product.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {CategoriesComponent} from './admin-products/categories/categories.component';
import {CategoryComponent} from './admin-products/category/category.component';
import {FrameColorsComponent} from './admin-products/frame-colors/frame-colors.component';
import {LensColorsComponent} from './admin-products/lens-colors/lens-colors.component';
import {AuthGuard} from '../shared/auth/auth.guard';
import {UploadProductsComponent} from './admin-products/upload-products/upload-products.component';

const adminRoutes: Routes = [
  {path: '', component: AdminComponent,
    children: [
      {path: 'products', component: AdminProductsComponent},
      {path: 'products/add', component: AddProductComponent},
      {path: 'products/upload-products', component: UploadProductsComponent},
      {path: 'products/categories', component: CategoriesComponent},
      {path: 'products/category', component: CategoryComponent},
      {path: 'products/frame-colors', component: FrameColorsComponent},
      {path: 'products/lens-colors', component: LensColorsComponent},
      {path: 'users', component: AdminUsersComponent},
      ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
