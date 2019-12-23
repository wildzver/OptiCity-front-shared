import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/models/product';
import {Router} from '@angular/router';
import {ProductsService} from '../../shared/app-services/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products: Product[];

  constructor(private router: Router, private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getFilteredProducts().subscribe(data => {
      this.products = data.content;
      console.log(this.products);
    });
  }

  deleteProduct(product: Product): void {
  this.productService.deleteProduct(product)
    .subscribe(data => {this.products = this.products.filter(u => u !== product);
    });
  }

}
