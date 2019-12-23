import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbNavigationComponent} from './breadcrumb-navigation.component';
import {RouterModule} from '@angular/router';

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
