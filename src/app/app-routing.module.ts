import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {CartComponent} from './order/cart/cart.component';
import {AuthGuard} from './shared/auth/auth.guard';
import {OrderComponent} from './order/order.component';
import {ServicesComponent} from './services/services.component';
import {ContactsComponent} from './contacts/contacts.component';
import {HowOrderComponent} from './how-order/how-order.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', loadChildren: './products/products.module#ProductsModule', data: {breadcrumb: 'Каталог' }},
  {path: 'app-services', component: ServicesComponent, data: {breadcrumb: 'Послуги'}},
  {path: 'contacts', component: ContactsComponent},
  {path: 'howorder', component: HowOrderComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'profile', loadChildren: './profile/profile.module#ProfileModule', data: {breadcrumb: 'Мій кабінет'}},
  {path: 'cart', component: OrderComponent, canActivate: [CartComponent]},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule' , canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, data: {breadcrumb: 'Пошук'}},
  {path: '**', pathMatch: 'full', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
