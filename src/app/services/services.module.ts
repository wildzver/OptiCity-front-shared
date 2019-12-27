import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesComponent} from './services.component';
import {BreadcrumbNavigationModule} from '../breadcrumb-navigation/breadcrumb-navigation.module';

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    BreadcrumbNavigationModule
  ],
  exports: [
    ServicesComponent,
  ]
})
export class ServicesModule {
}
