import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {AddProductComponent} from './add-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';

@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ]
})
export class AddProductModule {
}
