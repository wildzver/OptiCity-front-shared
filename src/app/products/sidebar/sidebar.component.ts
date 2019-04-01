import {Component, OnInit} from '@angular/core';
import {products} from '../../shared/mocks';
import {ProductsCatalogItemComponent} from '../products-catalog/product-item/products-catalog-item.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

 // getVeloglasses() {
 //    const getVeloglasses = products.filter(veloglasses => veloglasses.category === 'veloglasses');
 //  }
}
