import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from './admin/admin.module';
import {CartComponent} from './order/cart/cart.component';
import {OrderDetailsComponent} from './order/order-details/order-details.component';
import {OrderComponent} from './order/order.component';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from './shared/shared.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule, MatMenuModule,
  MatOptionModule, MatSidenavModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {ContactsComponent} from './contacts/contacts.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {BreadcrumbNavigationModule} from './breadcrumb-navigation/breadcrumb-navigation.module';
import {ServicesModule} from './services/services.module';
import {FooterComponent} from './footer/footer.component';
import {SearchModule} from './search/search.module';
import {SpinnerOverlayModule} from './core/spinner-overlay/spinner-overlay.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    OrderDetailsComponent,
    OrderComponent,
    ContactsComponent,
    DeliveryComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
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
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
