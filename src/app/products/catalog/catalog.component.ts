import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../shared/models/product';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class CatalogComponent {

  @Input()
  productsInput: Product[];

  // search: string[];
  //
  // minPrice: number;
  // maxPrice: number;
  // searchedLensColors = new Array<number>();
  // searchedFrameColors = new Array<number>();
  //
  //
  // pageNumber: number;
  // pageSize: number;
  // totalItems: any;
  //
  // category: string;
  // sortBy: string;
  // sortDirection: string;
  //
  //
  // private querySubscription: Subscription;
  //
  // constructor(private route: ActivatedRoute,
  //             private router: Router,
  //             private productsService: ProductsService,
  //             private filterService: FilterService,
  //             private pagerService: PagerService,
  // ) {
  // }
  //
  // filterSubscription = new Subscription();
  // pagerSubscription = new Subscription();
  // routeCategorySubscription = new Subscription();
  // minPriceSubscription = this.filterService.currentMinPrice.subscribe(minPrice => {
  //   this.minPrice = minPrice;
  //   console.log('MIN PRICE CHANGING IN CATALOG', this.minPrice);
  // });
  // maxPriceSubscription = this.filterService.currentMaxPrice.subscribe(maxPrice => this.maxPrice = maxPrice);
  // lensColorsSubscription = this.filterService.currentSearchedLensColors.subscribe(searchedLensColors => {
  //   this.searchedLensColors = searchedLensColors;
  //   console.log('SEARCHED LENS COLORS CHANGING IN CATALOG', this.searchedLensColors);
  // });
  // frameColorsSubscription = this.filterService.currentSearchedFrameColors.subscribe(searchedFrameColors => {
  //   this.searchedFrameColors = searchedFrameColors;
  // });
  // pageNumberSubscription = this.pagerService.currentPageNumber.subscribe(pageNumber => {
  //   this.pageNumber = pageNumber;
  //   // this.loadProducts();
  // });
  // pageSizeSubscription = this.pagerService.currentPageSize.subscribe(pageSize => this.pageSize = pageSize);
  // sortBySubscription = this.pagerService.currentSortBy.subscribe(sortBy => this.sortBy = sortBy);
  // sortDirectionSubscription = this.pagerService.currentSortDirection.subscribe(sortDirection => this.sortDirection = sortDirection);
  //
  // ngOnInit() {
  //
  //   this.querySubscription = this.route.queryParams.subscribe((queryParams: any) => {
  //     this.search = queryParams.search;
  //     console.log('MY SEARCH!' + queryParams.search);
  //     console.log('MY SEARCH TYPE!' + typeof queryParams.search);
  //   });
  //
  //   this.routeCategorySubscription = this.route.paramMap.subscribe(params => {
  //     this.category = params.get('category');
  //     console.log('PARAMS CATEGORY!!!', params.get('category'));
  //   });
  //
  //   this.filterSubscription
  //     .add(this.minPriceSubscription)
  //     .add(this.maxPriceSubscription)
  //     .add(this.lensColorsSubscription)
  //     .add(this.frameColorsSubscription);
  //   this.pagerSubscription
  //     .add(this.pageNumberSubscription)
  //     .add(this.pageSizeSubscription)
  //     .add(this.sortBySubscription)
  //     .add(this.sortDirectionSubscription);
  //
  //   this.router.events.pipe(
  //     filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
  //
  //     // if (this.category != null) {
  //     //   this.productsService.getProductsByCategory(this.route.snapshot.paramMap.get('category'), this.getFilterParameters())
  //     //     .subscribe(productsByCategory => {
  //     //         if (productsByCategory.totalElements > 0) {
  //     //           this.products = productsByCategory.content;
  //     //           console.log('PRODUCTS BY CATEGORY CONTENT IN CATALOG', productsByCategory.content);
  //     //           console.log('PRODUCTS BY CATEGORY CONTENT IN CATALOG', this.products);
  //     //           this.pagerService.changeTotalItems(productsByCategory.totalElements);
  //     //           console.log('TOTAL ITEMS PRODUCTS BY CATEGORY CONTENT IN CATALOG', productsByCategory.totalElements);
  //     //         }
  //     //       }
  //     //     );
  //     // }
  //
  //     this.productsService.getFilteredProducts(this.getFilterParameters())
  //       .subscribe(data => {
  //         this.products = data.content;
  //         this.pagerService.changeTotalItems(data.totalElements);
  //       });
  //   });
  // }
  //
  // // ngAfterViewInit(): void {
  //
  // // this.router.events.pipe(
  // //   filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
  // //   this.loadProducts();
  // // });
  // // }
  //
  // ngOnDestroy(): void {
  //   this.pagerSubscription.unsubscribe();
  //   this.filterSubscription.unsubscribe();
  //   this.routeCategorySubscription.unsubscribe();
  //   this.querySubscription.unsubscribe();
  // }
  //
  // private getFilterParameters() {
  //   return {
  //     pageNumber: this.pageNumber - 1,
  //     pageSize: this.pageSize,
  //     sortBy: this.sortBy,
  //     sortDirection: this.sortDirection,
  //     minPrice: this.minPrice,
  //     maxPrice: this.maxPrice,
  //     searchedLensColors: this.searchedLensColors,
  //     searchedFrameColors: this.searchedFrameColors
  //
  //   };
  // }
  //
  // private loadProducts() {
  //   console.log('LAUNCH LOAD PRODUCTS!');
  //
  //   if (this.search === undefined || (this.search !== undefined && this.search.toString() === '')) {
  //
  //     if (this.category != null) {
  //       // const category = this.route.paramMap.subscribe(category => );
  //       console.log('PARAM CATEGORY2!!!', this.category);
  //       this.productsService.getProductsByCategory(this.category, this.getFilterParameters())
  //         .subscribe(productsByCategory => {
  //             if (productsByCategory.totalElements > 0) {
  //               this.products = productsByCategory.content;
  //               console.log('PRODUCTS BY CATEGORY CONTENT IN CATALOG', productsByCategory.content);
  //               this.pagerService.changeTotalItems(productsByCategory.totalElements);
  //               console.log('TOTAL ITEMS PRODUCTS BY CATEGORY CONTENT IN CATALOG', productsByCategory.totalElements);
  //             }
  //           }
  //         );
  //     }
  //
  //     if (this.category == null) {
  //       this.productsService.getFilteredProducts(this.getFilterParameters())
  //         .subscribe(data => {
  //           this.products = data.content;
  //           this.pagerService.changeTotalItems(data.totalElements);
  //         });
  //     }
  //   } else {
  //     console.log('this.search.length!!!!', this.search.length);
  //     console.log('this.search[0]!!!!', this.search[0]);
  //     console.log('this.search[1]!!!!', this.search[1]);
  //     let parameters;
  //     if (this.search.length === 1) {
  //       parameters = {
  //         search: this.search,
  //         pageNumber: this.pageNumber - 1,
  //         pageSize: this.pageSize
  //       };
  //     }
  //
  //     if (this.search.length > 1) {
  //       parameters = {
  //         search: this.search.toString().split(',').join(' '),
  //         pageNumber: this.pageNumber - 1,
  //         pageSize: this.pageSize
  //       };
  //     }
  //
  //     this.productsService.getSearchedPagedProducts(parameters)
  //       .subscribe(data => {
  //         this.products = data.content;
  //         this.pagerService.changeTotalItems(data.totalElements);
  //         // this.totalItems = data.totalElements;
  //         console.log('----------------]]]', data);
  //         console.log('-{{---------------]]]', this.products);
  //       });
  //   }
  //
  // }


}

