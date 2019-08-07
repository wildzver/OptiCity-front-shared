import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {VeloglassesComponent} from './veloglasses/veloglasses.component';
import {SkiglassesComponent} from './skiglasses/skiglasses.component';
import {FramesComponent} from './frames/frames.component';
import {AccessoriesComponent} from './accessories/accessories.component';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {ProductsCatalogCategoryComponent} from './products-catalog/products-catalog-category/products-catalog-category.component';
import {ProductsCatalogComponent} from './products-catalog/products-catalog.component';

const productsRotes: Routes = [
  {path: 'products', component: ProductsCatalogComponent},
  {path: 'products/:category', component: ProductsCatalogCategoryComponent},
  // {path: 'products/veloglasses', component: VeloglassesComponent},
  {path: 'products/:category/:productNumber', component: ProductDetailsComponent},
  {path: 'products/:category/:category/:productNumber', redirectTo: 'products/:category/:productNumber'},
  // {path: 'products/:productNumber', component: ProductDetailsComponent},
  // {path: 'products/skiglasses', component: SkiglassesComponent},
  // {path: 'products/frames', component: FramesComponent},
  // {path: 'products/accessories', component: AccessoriesComponent},
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
