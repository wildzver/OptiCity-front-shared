import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductDetailsComponent} from './product-details.component';
import {BreadcrumbNavigationModule} from '../breadcrumb-navigation/breadcrumb-navigation.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbNavigationModule

  ],
  exports: [
    ProductDetailsComponent
  ],
})
export class ProductDetailsModule { }
