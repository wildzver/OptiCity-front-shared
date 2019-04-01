import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-products-catalog-item',
  templateUrl: './products-catalog-item.component.html',
  styleUrls: ['./products-catalog-item.component.scss']
})
export class ProductsCatalogItemComponent implements OnInit {
  @Input() productInput;

  constructor() { }

  ngOnInit() {
  }

}
