import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {TrimPipe} from './pipes/trim.pipe';
import {SearchPanelComponent} from '../header/search-panel/search-panel.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule
} from '@angular/material';
import {PaginationComponent} from './pagination/pagination.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerOverlayWrapperComponent } from './spinner-overlay-wrapper/spinner-overlay-wrapper.component';

@NgModule({
  declarations: [
    CapitalizePipe,
    TrimPipe,
    SearchPanelComponent,
    PaginationComponent,
    CustomCheckboxComponent,
    SpinnerComponent,
    SpinnerOverlayWrapperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgbPaginationModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    CapitalizePipe,
    TrimPipe,
    SearchPanelComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    PaginationComponent,
    CustomCheckboxComponent,
    SpinnerComponent,
    SpinnerOverlayWrapperComponent
  ],
})
export class SharedModule {
}
