import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductsService} from '../../../shared/services/products.service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-products-catalog-category',
  templateUrl: './products-catalog-category.component.html',
  styleUrls: ['./products-catalog-category.component.scss']
})
export class ProductsCatalogCategoryComponent implements OnInit {

  products = Product[''];

  private category: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService) {
    this.subscription = route.params.subscribe(params => {
      this.category = params.category;
      console.log('PARAMS!!!', params.category);
    });
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
        this.productService.getProductsByCategory(this.category)
          .subscribe(data => {this.products = data;
                              console.log('PRODUCT-CATALOG-CATAGORY!!', this.products);
          });
      }
    );
    this.productService.getProductsByCategory(this.category)
      .subscribe(data => {this.products = data;
                          console.log('PRODUCT-CATALOG-CATAGORY2!!', this.products);
    });
  }

}
