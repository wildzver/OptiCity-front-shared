import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ProductsComponent} from './products.component';
import {VeloglassesComponent} from './veloglasses/veloglasses.component';
import {SkiglassesComponent} from './skiglasses/skiglasses.component';
import {FramesComponent} from './frames/frames.component';
import {AccessoriesComponent} from './accessories/accessories.component';
import {ProductsRoutingModule} from './products-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';
import {ProductsCatalogModule} from './products-catalog/products-catalog.module';
import {SharedModule} from '../shared/shared.module';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {ProductDetailsModule} from '../product-details/product-details.module';

@NgModule({
  declarations: [
    ProductsComponent,
    SidebarComponent,
    VeloglassesComponent,
    SkiglassesComponent,
    FramesComponent,
    AccessoriesComponent,
    ProductComponent,
    ProductsCatalogComponent,
    ProductDetailsComponent
  ],
  imports: [
    ProductsCatalogModule,
    CommonModule,
    ProductsRoutingModule,
    // SharedModule,
    ProductDetailsModule
  ]
})
export class ProductsModule {
}
