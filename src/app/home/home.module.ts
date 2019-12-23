import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import { HomeCatalogComponent } from './home-catalog/home-catalog.component';
import {RouterModule} from '@angular/router';
import {SpinnerOverlayModule} from '../core/spinner-overlay/spinner-overlay.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomeCatalogComponent],
  imports: [
    CommonModule,
    RouterModule,
    SpinnerOverlayModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
