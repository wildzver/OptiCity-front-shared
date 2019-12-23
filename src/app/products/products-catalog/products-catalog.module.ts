import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsCatalogItemComponent} from './product-item/products-catalog-item.component';
import {ProductsRoutingModule} from '../products-routing.module';
import {FormsModule} from '@angular/forms';
import {PagerService} from '../../shared/app-services/pager.service';
import {PaginationComponent} from '../../shared/pagination/pagination.component';
import {NgbPagination, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchPanelComponent} from '../../header/search-panel/search-panel.component';
import {SharedModule} from '../../shared/shared.module';
import {BreadcrumbNavigationModule} from '../../breadcrumb-navigation/breadcrumb-navigation.module';
import {ProductsCatalogItemModule} from './product-item/products-catalog-item.module';
import {ProductDetailsModule} from './product-details/product-details.module';
import {CatalogModule} from '../catalog/catalog.module';

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
    ProductDetailsModule,
    CatalogModule
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
