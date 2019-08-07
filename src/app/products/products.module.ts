import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {VeloglassesComponent} from './veloglasses/veloglasses.component';
import {SkiglassesComponent} from './skiglasses/skiglasses.component';
import {FramesComponent} from './frames/frames.component';
import {AccessoriesComponent} from './accessories/accessories.component';
import {ProductsRoutingModule} from './products-routing.module';
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';
import {ProductsCatalogModule} from './products-catalog/products-catalog.module';
import {SharedModule} from '../shared/shared.module';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {ProductDetailsModule} from '../product-details/product-details.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductsCatalogCategoryComponent} from './products-catalog/products-catalog-category/products-catalog-category.component';

@NgModule({
  declarations: [
    SidebarComponent,
    VeloglassesComponent,
    SkiglassesComponent,
    FramesComponent,
    AccessoriesComponent,
    ProductsCatalogComponent,
    ProductsCatalogCategoryComponent,
    ProductDetailsComponent,
  ],
  imports: [
    ProductsCatalogModule,
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ProductDetailsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule {
}
