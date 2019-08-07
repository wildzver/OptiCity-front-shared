import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SortByDirective} from './directives/sortby.directive';
import {FilterTextboxModule} from './filter-textbox/filter-textbox.module';
import {PaginationModule} from './pagination/pagination.module';
import {FormsModule} from '@angular/forms';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';

@NgModule({
  declarations: [SortByDirective, CapitalizePipe, TrimPipe],
  imports: [
    CommonModule, FilterTextboxModule, PaginationModule
  ],
  exports: [CommonModule, FormsModule, CapitalizePipe, TrimPipe, SortByDirective, FilterTextboxModule, PaginationModule],
})
export class SharedModule { }
