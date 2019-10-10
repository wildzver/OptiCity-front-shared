import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SortByDirective} from './directives/sortby.directive';
import {FilterTextboxModule} from './filter-textbox/filter-textbox.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {TrimPipe} from './pipes/trim.pipe';
import {SearchComponent} from '../search/search.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PaginationComponent} from './pagination/pagination.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SortByDirective,
    CapitalizePipe,
    TrimPipe,
    SearchComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FilterTextboxModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
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
    SortByDirective,
    FilterTextboxModule,
    SearchComponent,
    // BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    PaginationComponent
  ],
})
export class SharedModule {
}
