import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {AddProductComponent} from './admin-products/add-product/add-product.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
// import {CategoriesComponent} from './admin-products/categories/categories.component';
import {CategoriesComponent} from './admin-products/category/categories.component';
import {FrameColorsComponent} from './admin-products/frame-colors/frame-colors.component';
import {LensColorsComponent} from './admin-products/lens-colors/lens-colors.component';
import {UploadProductsComponent} from './admin-products/upload-products/upload-products.component';
import {LensMaterialsComponent} from './admin-products/lens-materials/lens-materials.component';
import {FrameMaterialsComponent} from './admin-products/frame-materials/frame-materials.component';
import {DioptersComponent} from './admin-products/diopters/diopters.component';
import {OriginsComponent} from './admin-products/origins/origins.component';
import {SexComponent} from './admin-products/sex/sex.component';
import {EditProductComponent} from './admin-products/edit-product/edit-product.component';

const adminRoutes: Routes = [
  {path: '', component: AdminComponent,
    children: [
      {path: 'products', component: AdminProductsComponent},
      {path: 'products/add', component: AddProductComponent},
      {path: 'products/:id/edit', component: EditProductComponent},
      {path: 'products/upload-products', component: UploadProductsComponent},
      // {path: 'products/categories', component: CategoriesComponent},
      {path: 'products/category', component: CategoriesComponent},
      {path: 'products/lens-colors', component: LensColorsComponent},
      {path: 'products/frame-colors', component: FrameColorsComponent},
      {path: 'products/lens-materials', component: LensMaterialsComponent},
      {path: 'products/frame-materials', component: FrameMaterialsComponent},
      {path: 'products/diopters', component: DioptersComponent},
      {path: 'products/origins', component: OriginsComponent},
      {path: 'products/sexes', component: SexComponent},
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
