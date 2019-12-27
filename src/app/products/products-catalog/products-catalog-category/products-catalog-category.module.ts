import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsCatalogCategoryRoutingModule} from './products-catalog-category-routing.module';
import {ProductsCatalogCategoryComponent} from './products-catalog-category.component';
import {BreadcrumbNavigationModule} from '../../../breadcrumb-navigation/breadcrumb-navigation.module';
import {ProductsCatalogComponent} from '../products-catalog.component';
import {SidebarComponent} from '../../sidebar/sidebar.component';
import {ProductsCatalogItemModule} from '../product-item/products-catalog-item.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductDetailsModule} from '../product-details/product-details.module';
import {SortPanelModule} from '../../../sort-panel/sort-panel.module';
import {CatalogModule} from '../../catalog/catalog.module';

@NgModule({
  declarations: [
    ProductsCatalogCategoryComponent,
    ProductsCatalogComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ProductsCatalogCategoryRoutingModule,
    BreadcrumbNavigationModule,
    ProductsCatalogItemModule,
    SharedModule,
    NgbPaginationModule,
    ProductDetailsModule,
    SortPanelModule,
    CatalogModule

  ],
  exports: [
    ProductsCatalogComponent,
    SidebarComponent,
    ProductsCatalogCategoryComponent
  ]
})
export class ProductsCatalogCategoryModule {
}
