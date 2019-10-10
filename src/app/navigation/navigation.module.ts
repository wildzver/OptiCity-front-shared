import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {RouterModule} from '@angular/router';
import {ServicesComponent} from '../services/services.component';
import {ServicesModule} from '../services/services.module';

@NgModule({
  declarations: [
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    // AppRoutingModule
    RouterModule,
    // ServicesModule
  ],
  exports: [
    NavigationComponent,
  ]
})
export class NavigationModule {
}
