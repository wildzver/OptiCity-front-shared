import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CartComponent} from './order/cart/cart.component';
import {AuthGuard} from './shared/auth/auth.guard';
import {OrderComponent} from './order/order.component';
import {ServicesComponent} from './services/services.component';
import {ContactsComponent} from './contacts/contacts.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', loadChildren: './products/products.module#ProductsModule', data: {breadcrumb: 'Каталог'}},
  // {path: 'app-services', component: ServicesComponent, data: {breadcrumb: 'Послуги'}},
  {path: 'contacts', component: ContactsComponent, data: {breadcrumb: 'Контакти'}},
  {
    path: 'delivery',
    component: DeliveryComponent,
    data: {
      breadcrumb: 'Доставка',
      title: 'Доставка',
      description: 'OptiCity пропонує наступні способи доставки: власна (вартість 40 грн), Нова Пошта, забрати товар самостійно',
      ogUrl: 'https://opticity.com.ua/delivery',
      ogImage: 'https://opticity.com.ua/assets/images/delivery.png'
    }
  },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'cart', component: OrderComponent, canActivate: [CartComponent], data: {breadcrumb: 'Корзина'}},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, data: {breadcrumb: 'Пошук'}},
  {path: '**', pathMatch: 'full', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
