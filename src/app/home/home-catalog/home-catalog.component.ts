import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../shared/app-services/products.service';
import {Category} from '../../shared/models/category';

@Component({
  selector: 'app-home-catalog',
  templateUrl: './home-catalog.component.html',
  styleUrls: ['./home-catalog.component.scss']
})
export class HomeCatalogComponent implements OnInit {
  // categories: Category[];
categories = new Array();

isLoading = false;
  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.isLoading = true;
    this.productsService.getCategories().subscribe((data: Category[]) => {
      // this.categories = data;
      const sunglassesFrames: Category[] = new Array(2);
      sunglassesFrames[0] = data.find(item => item.name === 'sunglasses');
      sunglassesFrames[1] = data.find(item => item.name === 'frames');
      this.categories.push(sunglassesFrames);
      const veloSkiglasses: Category[] = new Array(2);
      veloSkiglasses[0] = data.find(item => item.name === 'veloglasses');
      veloSkiglasses[1] = data.find(item => item.name === 'skiglasses');
      this.categories.push(veloSkiglasses);
      console.log(this.categories);
      this.isLoading = false;
    });
  }



}
