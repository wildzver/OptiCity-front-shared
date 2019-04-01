import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '', component: HomeComponent},
  {path: '', loadChildren: './products/products.module#ProductsModule'},
  // {path: 'products/:id', loadChildren: './products/products.module#ProductsModule'},
  // {path: 'products/veloglasses', redirectTo: 'products/veloglasses'},
  // {path: 'products/skiglasses', redirectTo: 'products/skiglasses'},
  // {path: 'products/frames', redirectTo: 'products/frames'},
  // {path: 'products/accessories', redirectTo: 'products/accessories'},
  {path: '**', pathMatch: 'full', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
