import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category';
import {ProductsService} from '../../shared/services/products.service';
import {Product} from '../../shared/models/product';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Color} from '../../shared/models/color';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories = Category[''];
  lensColors = Color[''];
  frameColors = Color[''];
  products = Product[''];
  category: string;
  minPrice: number;
  maxPrice: number;
  searchedLensColors = new Array<number>();
  searchedFrameColors = new Array<number>();

  private routeSubscription: Subscription;

  private querySubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productsService: ProductsService) {
    this.routeSubscription = route.params.subscribe(params => this.category = params.category);
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.minPrice = queryParam.minPrice;
        this.maxPrice = queryParam.maxPrice;
      }
    );
  }

  ngOnInit() {
    this.loadCategories();
    this.loadLensColors();
    this.loadFrameColors();
    // this.router.events.pipe(
      // filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
        // this.loadProductsAfterFilter();
        // this.productsService.getProductsAfterFilter(this.minPrice, this.maxPrice, this.searchedLensColors, this.searchedFrameColors)
        //   .subscribe(data => {
        //     this.products = data;
        //     console.log('SIDEBAR ON INIT!!', this.products, this.minPrice, this.maxPrice, this.searchedLensColors, this.searchedFrameColors);
        //   });
      // }
    // );

  }

  // private loadProductsAfterFilter() {
  //   const parameters = {
  //     minPrice: this.minPrice,
  //     maxPrice: this.maxPrice,
  //     searchedLensColors: this.searchedLensColors,
  //     searchedFrameColors: this.searchedFrameColors
  //   };
  //
  //   this.productsService.getProductsAfterFilter(parameters)
  //     .subscribe(data => {
  //       this.products = data;
  //       console.log(parameters);
  //       console.log('SIDEBAR ON INIT!!', this.products, this.minPrice, this.maxPrice, this.searchedLensColors, this.searchedFrameColors);
  //     });
  // }

  private loadCategories() {
    this.productsService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  private loadLensColors() {
    this.productsService.getLensColors().subscribe((data: Color[]) => {
      this.lensColors = data;
    });
  }

  private loadFrameColors() {
    this.productsService.getFrameColors().subscribe((data: Color[]) => {
      this.frameColors = data;
    });
  }

  private doPriceFilter() {
    this.router.navigate(['/products'], {queryParams: {minPrice: this.minPrice, maxPrice: this.maxPrice}, queryParamsHandling: 'merge'});
  }

  private doLensColorsFilter(event, lensColorId) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.searchedLensColors.push(lensColorId);
    } else {
      const index = this.searchedLensColors.findIndex(el => el === lensColorId);
      this.searchedLensColors.splice(index, 1);
    }
    this.router.navigate(['/products'], {queryParams: {lenscolor: this.searchedLensColors}, queryParamsHandling: 'merge'});
  }

  private doFrameColorsFilter(event, frameColorId) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.searchedFrameColors.push(frameColorId);
    } else {
      const index = this.searchedFrameColors.findIndex(el => el === frameColorId);
      this.searchedFrameColors.splice(index, 1);
    }
    this.router.navigate(['/products'], {queryParams: {framecolor: this.searchedFrameColors}, queryParamsHandling: 'merge'});
  }
}
