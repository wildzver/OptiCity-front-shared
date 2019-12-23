import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from './search.component';
import {ProductsCatalogComponent} from '../products/products-catalog/products-catalog.component';
import {SidebarComponent} from '../products/sidebar/sidebar.component';
import {ProductsCatalogCategoryRoutingModule} from '../products/products-catalog/products-catalog-category/products-catalog-category-routing.module';
import {BreadcrumbNavigationModule} from '../breadcrumb-navigation/breadcrumb-navigation.module';
import {ProductsCatalogItemModule} from '../products/products-catalog/product-item/products-catalog-item.module';
import {SharedModule} from '../shared/shared.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductDetailsModule} from '../products/products-catalog/product-details/product-details.module';
import {SortPanelModule} from '../sort-panel/sort-panel.module';
import {CatalogModule} from '../products/catalog/catalog.module';
import {ProductsCatalogCategoryComponent} from '../products/products-catalog/products-catalog-category/products-catalog-category.component';
import {ProductsCatalogCategoryModule} from '../products/products-catalog/products-catalog-category/products-catalog-category.module';
import {ProductsCatalogModule} from '../products/products-catalog/products-catalog.module';
import {PagerService} from '../shared/app-services/pager.service';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ProductsCatalogCategoryModule,
    ProductsCatalogModule,
    BreadcrumbNavigationModule,
    ProductsCatalogItemModule,
    SharedModule,
    NgbPaginationModule,
    ProductDetailsModule,
    SortPanelModule,
    CatalogModule
  ],
  exports: [
    SearchComponent
  ],
  providers: [
    PagerService
  ]
})
export class SearchModule { }
