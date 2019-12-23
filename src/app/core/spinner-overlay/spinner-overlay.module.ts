import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerOverlayComponent} from './spinner-overlay.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    SpinnerOverlayComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SpinnerOverlayComponent
  ]
})
export class SpinnerOverlayModule { }
