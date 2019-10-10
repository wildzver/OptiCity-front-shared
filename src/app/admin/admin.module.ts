import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddProductModule} from './admin-products/add-product/add-product.module';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {FileUploaderComponent} from '../shared/file-uploader/file-uploader.component';
import {ProgressComponent} from '../shared/progress/progress.component';
import {CategoriesComponent} from './admin-products/categories/categories.component';
import {CategoryComponent} from './admin-products/category/category.component';
import {InlineEditComponent} from './inline-edit/inline-edit.component';
import {FrameColorsComponent} from './admin-products/frame-colors/frame-colors.component';
import {LensColorsComponent} from './admin-products/lens-colors/lens-colors.component';
import {UploadProductsComponent} from './admin-products/upload-products/upload-products.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    FileUploaderComponent,
    ProgressComponent,
    CategoriesComponent,
    CategoryComponent,
    InlineEditComponent,
    FrameColorsComponent,
    LensColorsComponent,
    UploadProductsComponent
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
