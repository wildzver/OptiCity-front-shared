import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductsCatalogComponent} from './products-catalog/products-catalog.component';

const productsRotes: Routes = [
  {path: '', component: ProductsCatalogComponent},
  {
    path: ':category',
    loadChildren: './products-catalog/products-catalog-category/products-catalog-category.module#ProductsCatalogCategoryModule',
    data: {breadcrumb: ''}
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(productsRotes)
  ],
  exports: [
    CommonModule,
    RouterModule
  ]
})

export class ProductsRoutingModule {
}
