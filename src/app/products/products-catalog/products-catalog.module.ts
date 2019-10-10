import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsCatalogItemComponent} from './product-item/products-catalog-item.component';
import {ProductsRoutingModule} from '../products-routing.module';
import {FormsModule} from '@angular/forms';
import {PagerService} from '../../shared/services/pager.service';
import {PaginationComponent} from '../../shared/pagination/pagination.component';
import {NgbPagination, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchComponent} from '../../search/search.component';
import {SharedModule} from '../../shared/shared.module';
import {BreadcrumbNavigationModule} from '../../breadcrumb-navigation/breadcrumb-navigation.module';
import {ProductsCatalogItemModule} from './product-item/products-catalog-item.module';
import {ProductDetailsModule} from '../../product-details/product-details.module';

@NgModule({
  declarations: [
    // ProductsCatalogItemComponent,
    // PaginationComponent,
    // BreadcrumbNavigationComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    NgbPaginationModule,
    BreadcrumbNavigationModule,
    ProductsCatalogItemModule,
    SharedModule,
    ProductDetailsModule
  ],
  exports: [
    // ProductsCatalogItemComponent,
    // PaginationComponent,
    // NavigationComponent,
    // BreadcrumbComponent,
    // BreadcrumbNavigationComponent
  ],
  providers: [
    PagerService,
    // PaginationComponent
  ]
})
export class ProductsCatalogModule {
}
