import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import { HomeCatalogComponent } from './home-catalog/home-catalog.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HomeComponent, HomeCatalogComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  // exports: [HomeComponent]
})
export class HomeModule { }
