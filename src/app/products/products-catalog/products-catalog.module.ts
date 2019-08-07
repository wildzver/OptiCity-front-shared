import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsCatalogItemComponent} from './product-item/products-catalog-item.component';
import {ProductsRoutingModule} from '../products-routing.module';
import {ProductsCatalogExtendedItemComponent} from './products-catalog-extended-item/products-catalog-extended-item.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProductsCatalogItemComponent,
    ProductsCatalogExtendedItemComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule
  ],
  exports: [
    ProductsCatalogItemComponent,
    ProductsCatalogExtendedItemComponent
  ]
})
export class ProductsCatalogModule {
}
