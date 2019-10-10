import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {Category} from '../../shared/models/category';

@Component({
  selector: 'app-catalog',
  templateUrl: './home-catalog.component.html',
  styleUrls: ['./home-catalog.component.scss']
})
export class HomeCatalogComponent implements OnInit {
  categories: Category[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.productsService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories);
    });
  }


}
