import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogComponent} from './catalog.component';
import {RouterModule} from '@angular/router';
import {ProductsCatalogItemModule} from '../products-catalog/product-item/products-catalog-item.module';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProductsCatalogItemModule
  ],
  exports: [CatalogComponent]
})
export class CatalogModule {
}
