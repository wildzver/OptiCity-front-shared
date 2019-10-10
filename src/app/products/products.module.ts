import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsCatalogModule} from './products-catalog/products-catalog.module';
import {SharedModule} from '../shared/shared.module';
import {ProductDetailsModule} from '../product-details/product-details.module';
import {ReactiveFormsModule} from '@angular/forms';
import {BreadcrumbNavigationModule} from '../breadcrumb-navigation/breadcrumb-navigation.module';
import {ProductsCatalogCategoryModule} from './products-catalog/products-catalog-category/products-catalog-category.module';
import {SortPanelModule} from '../sort-panel/sort-panel.module';

@NgModule({
  declarations: [
  ],
  imports: [
    ProductsCatalogModule,
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ProductDetailsModule,
    ReactiveFormsModule,
    BreadcrumbNavigationModule,
    ProductsCatalogCategoryModule,
    SortPanelModule
  ]
})
export class ProductsModule {
}
