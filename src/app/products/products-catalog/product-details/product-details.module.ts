import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductDetailsComponent} from './product-details.component';
import {BreadcrumbNavigationModule} from '../../../breadcrumb-navigation/breadcrumb-navigation.module';
import {RouterModule} from '@angular/router';
import {ProductsCatalogItemModule} from '../product-item/products-catalog-item.module';
import {SharedModule} from '../../../shared/shared.module';
import {SpinnerOverlayModule} from '../../../core/spinner-overlay/spinner-overlay.module';

@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    ProductsCatalogItemModule,
    CommonModule,
    RouterModule,
    BreadcrumbNavigationModule,
    SharedModule,
    SpinnerOverlayModule
  ],
  exports: [
    ProductDetailsComponent
  ],
})
export class ProductDetailsModule {
}
