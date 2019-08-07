import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsCatalogItemComponent} from '../products-catalog/product-item/products-catalog-item.component';
import {ProductsRoutingModule} from '../products-routing.module';

@NgModule({
  declarations: [ProductsCatalogItemComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductsCatalogItemComponent]
})
export class VeloglassesModule { }
