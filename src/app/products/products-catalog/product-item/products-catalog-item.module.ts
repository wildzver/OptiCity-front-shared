import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsCatalogItemComponent} from './products-catalog-item.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ProductsCatalogItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductsCatalogItemComponent
  ]
})
export class ProductsCatalogItemModule { }
