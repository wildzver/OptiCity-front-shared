import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from '../products-routing.module';
import {FormsModule} from '@angular/forms';
import {PagerService} from '../../shared/app-services/pager.service';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {BreadcrumbNavigationModule} from '../../breadcrumb-navigation/breadcrumb-navigation.module';
import {ProductsCatalogItemModule} from './product-item/products-catalog-item.module';
import {ProductDetailsModule} from './product-details/product-details.module';
import {CatalogModule} from '../catalog/catalog.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    NgbPaginationModule,
    BreadcrumbNavigationModule,
    ProductsCatalogItemModule,
    SharedModule,
    ProductDetailsModule,
    CatalogModule
  ],
  exports: [
  ],
  providers: [
    PagerService,
  ]
})
export class ProductsCatalogModule {
}
