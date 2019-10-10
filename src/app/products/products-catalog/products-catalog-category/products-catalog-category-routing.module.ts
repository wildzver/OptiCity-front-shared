import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductsCatalogCategoryComponent} from './products-catalog-category.component';
import {ProductDetailsComponent} from '../../../product-details/product-details.component';

const productsCatalogCategoryRoutes: Routes = [
  {path: '', component: ProductsCatalogCategoryComponent},
  // {path: 'products/veloglasses', component: VeloglassesComponent},
  {path: ':productNumber', component: ProductDetailsComponent, data: {breadcrumb: ''}},
  {path: ':category/:productNumber', redirectTo: ':productNumber'},

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(productsCatalogCategoryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsCatalogCategoryRoutingModule { }
