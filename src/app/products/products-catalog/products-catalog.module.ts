import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsCatalogItemComponent} from './product-item/products-catalog-item.component';
import {ProductsRoutingModule} from '../products-routing.module';

@NgModule({
  declarations: [ProductsCatalogItemComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductsCatalogItemComponent
  ]
})
export class ProductsCatalogModule {
}
