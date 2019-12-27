import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddProductModule} from './admin-products/add-product/add-product.module';
import {CategoriesComponent} from './admin-products/category/categories.component';
import {FrameColorsComponent} from './admin-products/frame-colors/frame-colors.component';
import {LensColorsComponent} from './admin-products/lens-colors/lens-colors.component';
import {UploadProductsComponent} from './admin-products/upload-products/upload-products.component';
import { LensMaterialsComponent } from './admin-products/lens-materials/lens-materials.component';
import { FrameMaterialsComponent } from './admin-products/frame-materials/frame-materials.component';
import { DioptersComponent } from './admin-products/diopters/diopters.component';
import { OriginsComponent } from './admin-products/origins/origins.component';
import { SexComponent } from './admin-products/sex/sex.component';
import { EditProductComponent } from './admin-products/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminProductsComponent,
    CategoriesComponent,
    FrameColorsComponent,
    LensColorsComponent,
    UploadProductsComponent,
    LensMaterialsComponent,
    FrameMaterialsComponent,
    DioptersComponent,
    OriginsComponent,
    SexComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AddProductModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule {}
