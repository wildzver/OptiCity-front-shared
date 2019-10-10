import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SortPanelComponent} from './sort-panel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SortPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SortPanelComponent
  ]
})
export class SortPanelModule { }
