import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category';
import {ProductsService} from '../../shared/services/products.service';
import {Product} from '../../shared/models/product';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Color} from '../../shared/models/color';
import {filter, findIndex} from 'rxjs/operators';
import {element} from 'protractor';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories = Category[''];
  lensColors: Color[];
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
              private productsService: ProductsService) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => this.category = params.category);

    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.minPrice = queryParam.minPrice;
        this.maxPrice = queryParam.maxPrice;
        this.searchedLensColors = queryParam.lenscolor;
        this.searchedFrameColors = queryParam.framecolor;

        // if (queryParam.lenscolor !== undefined) {
        //   for (const param of queryParam.lenscolor) {
        //     this.searchedLensColors.push(parseInt(param, 10));
        //   }
        // }
      }
    );
    console.log('PARAMS', this.searchedLensColors);

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
      this.lensColors = data.map(item => {
        if (this.searchedLensColors !== undefined && this.searchedLensColors.toString().includes(item.id.toString())) {
          item.checked = true;
        }
        return item;
      });
    });
  }


  private loadFrameColors() {
    this.productsService.getFrameColors().subscribe((data: Color[]) => {
      this.frameColors = data.map(item => {
        if (this.searchedFrameColors !== undefined && this.searchedFrameColors.toString().includes(item.id.toString())) {
          item.checked = true;
        }
        return item;
      });
    });
  }

  private doPriceFilter() {
    this.router.navigate(['/products'], {queryParams: {minPrice: this.minPrice, maxPrice: this.maxPrice}, queryParamsHandling: 'merge'});
  }

  // private doLensColorsFilter(event, lensColorId) {
  //   const isChecked = event.target.checked;
  //   if (isChecked) {
  //     this.searchedLensColors.push(lensColorId);
  //   } else {
  //     const index = this.searchedLensColors.findIndex(el => el === lensColorId);
  //     this.searchedLensColors.splice(index, 1);
  //   }
  //   this.router.navigate(['/products'], {queryParams: {lenscolor: this.searchedLensColors}, queryParamsHandling: 'merge'});
  //   console.log('PARAMS2', this.searchedLensColors);

  // this.changeCheckbox(i);
  // if (this.lensColors) {
  //   this.lensColors[i].checked = !this.lensColors[i].checked;
  // }
  // }

  private doLensColorsFilter(lensColorId) {
    const lensColor = this.lensColors.find(value => value.id === lensColorId);
    if (this.lensColors) {
      lensColor.checked = !lensColor.checked;
    }

    this.router.navigate(['/products'], {
      queryParams: {
        lenscolor: this.lensColors.filter(item => {
          return item.checked === true;
        }).map(item => item.id)
      }, queryParamsHandling: 'merge'
    });
  }

  private doFrameColorsFilter(frameColorId) {
    const frameColor = this.frameColors.find(value => value.id === frameColorId);
    if (this.frameColors) {
      frameColor.checked = !frameColor.checked;
    }

    this.router.navigate(['/products'], {
      queryParams: {
        framecolor: this.frameColors.filter(item => {
          return item.checked === true;
        }).map(item => item.id)
      }, queryParamsHandling: 'merge'
    });
  }

  // private doFrameColorsFilter(event, frameColorId) {
  //   const isChecked = event.target.checked;
  //   if (isChecked) {
  //     this.searchedFrameColors.push(frameColorId);
  //   } else {
  //     const index = this.searchedFrameColors.findIndex(el => el === frameColorId);
  //     this.searchedFrameColors.splice(index, 1);
  //   }
  //   this.router.navigate(['/products'], {queryParams: {framecolor: this.searchedFrameColors}, queryParamsHandling: 'merge'});
  // }
}
