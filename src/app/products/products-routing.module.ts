import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule, Routes} from '@angular/router';
import {VeloglassesComponent} from './veloglasses/veloglasses.component';
import {SkiglassesComponent} from './skiglasses/skiglasses.component';
import {FramesComponent} from './frames/frames.component';
import {AccessoriesComponent} from './accessories/accessories.component';
import {ProductsModule} from './products.module';
import {ProductsComponent} from './products.component';
import {ProductDetailsComponent} from '../product-details/product-details.component';

const productsRotes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'products/veloglasses', component: VeloglassesComponent},
  {path: 'products/veloglasses/:id', component: ProductDetailsComponent},
  {path: 'products/skiglasses', component: SkiglassesComponent},
  {path: 'products/frames', component: FramesComponent},
  {path: 'products/accessories', component: AccessoriesComponent}
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
