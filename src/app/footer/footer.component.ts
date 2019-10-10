import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../shared/services/products.service';
import {Category} from '../shared/models/category';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  categories: Category[] = [];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.productsService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

}
