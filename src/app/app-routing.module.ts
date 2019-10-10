import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {CartComponent} from './order/cart/cart.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AuthGuard} from './shared/auth/auth.guard';
import {OrderComponent} from './order/order.component';
import {ProductsService} from './shared/services/products.service';
import {ServicesComponent} from './services/services.component';
import {ContactsComponent} from './contacts/contacts.component';
import {HowOrderComponent} from './how-order/how-order.component';
import {ProductsCatalogComponent} from './products/products-catalog/products-catalog.component';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '', component: HomeComponent},
  {path: 'products', loadChildren: './products/products.module#ProductsModule', data: {breadcrumb: 'Каталог' }},
  // {path: 'products/:id', loadChildren: './products/products.module#ProductsModule'},
  // {path: 'products/veloglasses', redirectTo: 'products/veloglasses'},
  // {path: 'products/skiglasses', redirectTo: 'products/skiglasses'},
  // {path: 'products/frames', redirectTo: 'products/frames'},
  // {path: 'products/accessories', redirectTo: 'products/accessories'},
  {path: 'services', component: ServicesComponent, data: {breadcrumb: 'Послуги'}},
  {path: 'contacts', component: ContactsComponent},
  {path: 'howorder', component: HowOrderComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'profile', loadChildren: './profile/profile.module#ProfileModule', data: {breadcrumb: 'Мій кабінет'}},
  {path: 'cart', component: OrderComponent, canActivate: [CartComponent]},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule' , canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
