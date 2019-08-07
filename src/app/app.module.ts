import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ProfileModule} from './profile/profile.module';
import {AdminComponent} from './admin/admin.component';
import {AdminModule} from './admin/admin.module';
import {AuthGuard} from './shared/auth/auth.guard';
import {CartComponent} from './order/cart/cart.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    CartComponent,
    OrderDetailsComponent,
    OrderComponent,
    // AuthGuard
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
