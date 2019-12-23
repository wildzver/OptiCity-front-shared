import {AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ProductDetailsComponent} from '../../products/products-catalog/product-details/product-details.component';

@Component({
  selector: 'app-spinner-overlay-wrapper',
  templateUrl: './spinner-overlay-wrapper.component.html',
  styleUrls: ['./spinner-overlay-wrapper.component.scss']
})
export class SpinnerOverlayWrapperComponent implements OnInit, AfterViewInit {

  @ViewChild(ProductDetailsComponent) productDetailsComponent;
  @Input() public showSpinner = false;
  @Input() public readonly message: string = 'Loading...';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.productDetailsComponent) {
      this.showSpinner = this.productDetailsComponent.showSpinner;
    }

  }


}
