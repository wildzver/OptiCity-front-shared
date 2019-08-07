import {ProductsService} from './products.service';
import {Category} from '../models/category';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CategoriesDataService {

  public categories = Category[''];

  constructor(private productsService: ProductsService) {
  }

  public loadCategories() {
    return this.productsService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log('CHECK!!!', this.categories);
    });
  }

}
