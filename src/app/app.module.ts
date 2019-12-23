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
import { SearchPanelComponent } from './header/search-panel/search-panel.component';
import {NgbCarousel, NgbCarouselModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from './shared/shared.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormField,
  MatFormFieldControl,
  MatIconModule, MatMenuModule,
  MatOption,
  MatOptionModule, MatSidenavModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import { ContactsComponent } from './contacts/contacts.component';
import { HowOrderComponent } from './how-order/how-order.component';
import {BreadcrumbNavigationModule} from './breadcrumb-navigation/breadcrumb-navigation.module';
import {ServicesModule} from './services/services.module';
import { FooterComponent } from './footer/footer.component';
import { SortPanelComponent } from './sort-panel/sort-panel.component';
import { SearchComponent } from './search/search.component';
import {SearchModule} from './search/search.module';
import {SpinnerOverlayModule} from './core/spinner-overlay/spinner-overlay.module';

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
    // ServicesComponent,
    ContactsComponent,
    HowOrderComponent,
    FooterComponent,
    // SearchPanelComponent,
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
    AdminModule,
    NgbTypeaheadModule,
    BrowserAnimationsModule,
    MatInputModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatMenuModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    BreadcrumbNavigationModule,
    ServicesModule,
    SearchModule,
    SpinnerOverlayModule
  ],
  // exports: [
  //   SearchPanelComponent
  // ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
