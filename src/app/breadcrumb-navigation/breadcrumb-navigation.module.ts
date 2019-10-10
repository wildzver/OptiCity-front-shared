import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbNavigationComponent} from './breadcrumb-navigation.component';
import {AppRoutingModule} from '../app-routing.module';
import {RouterModule} from '@angular/router';
import {NavigationModule} from '../navigation/navigation.module';

@NgModule({
  declarations: [BreadcrumbNavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BreadcrumbNavigationComponent
  ]
})
export class BreadcrumbNavigationModule { }
