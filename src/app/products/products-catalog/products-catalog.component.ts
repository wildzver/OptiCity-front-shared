import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductsService} from '../../shared/app-services/products.service';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {delay, filter} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Subscription} from 'rxjs';
import {FilterService} from '../../shared/app-services/filter.service';
import {PagerService} from '../../shared/app-services/pager.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(2000)),
    ]),
  ]
})
export class ProductsCatalogComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

  @ViewChild(SidebarComponent) sidebarComponent;
  products: Product[];
  // navigateTo = ['/products'];
  // search: string[];
  searchedSexes = new Array<number>();
  minPrice: number;
  maxPrice: number;
  searchedLensColors = new Array<number>();
  searchedFrameColors = new Array<number>();
  searchedFrameMaterials = new Array<number>();
  searchedDiopters = new Array<number>();
  filterForm: FormGroup;
  polarization: boolean;
  pageNumber: number;
  pageSize: number;
  totalItems: any;
  sortBy: string;
  sortDirection: string;

  isLoading = false;

  // private querySubscription: Subscription;
  productsSubscription: Subscription;
  filterSubscription = new Subscription();
  pagerSubscription = new Subscription();


  sexesSubscription = this.filterService.currentSearchedSexes.subscribe(sex => {
    this.searchedSexes = sex;
  });
  minPriceSubscription = this.filterService.currentMinPrice.subscribe(minPrice => {
    this.minPrice = minPrice;
    console.log('MIN PRICE CHANGING IN CATALOG', this.minPrice);
  });
  maxPriceSubscription = this.filterService.currentMaxPrice.subscribe(maxPrice => this.maxPrice = maxPrice);
  lensColorsSubscription = this.filterService.currentSearchedLensColors.subscribe(searchedLensColors => {
    this.searchedLensColors = searchedLensColors;
    console.log('SEARCHED LENS COLORS CHANGING IN CATALOG', this.searchedLensColors);
  });
  frameColorsSubscription = this.filterService.currentSearchedFrameColors.subscribe(searchedFrameColors => {
    this.searchedFrameColors = searchedFrameColors;
  });
  frameMateialSubscription = this.filterService.currentSearchedFrameMaterials.subscribe(frameMaterial => {
      this.searchedFrameMaterials = frameMaterial;
    });
  dioptersSubscription = this.filterService.currentSearchedDiopters.subscribe(diopter => {
      this.searchedDiopters = diopter;
    });
  polarizationSubscription = this.filterService.currentPolarization.subscribe(polarization => {
    this.polarization = polarization;
  });
  pageNumberSubscription = this.pagerService.currentPageNumber.subscribe(pageNumber => {
    this.pageNumber = pageNumber;
  });
  pageSizeSubscription = this.pagerService.currentPageSize.subscribe(pageSize => this.pageSize = pageSize);
  totalItemsSubscription = this.pagerService.currentTotalItems.subscribe(totalItems => {
    this.totalItems = totalItems;
  });
  sortBySubscription = this.pagerService.currentSortBy.subscribe(sortBy => this.sortBy = sortBy);
  sortDirectionSubscription = this.pagerService.currentSortDirection.subscribe(sortDirection => this.sortDirection = sortDirection);

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService,
              private filterService: FilterService,
              private pagerService: PagerService,
              private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.filterSubscription
      .add(this.sexesSubscription)
      .add(this.minPriceSubscription)
      .add(this.maxPriceSubscription)
      .add(this.lensColorsSubscription)
      .add(this.frameColorsSubscription)
      .add(this.frameMateialSubscription)
      .add(this.dioptersSubscription)
      .add(this.polarizationSubscription);
    this.pagerSubscription
      .add(this.pageNumberSubscription)
      .add(this.pageSizeSubscription)
      .add(this.totalItemsSubscription)
      .add(this.sortBySubscription)
      .add(this.sortDirectionSubscription);
    this.productsSubscription = this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
      this.loadProducts();
    });
  }

  ngAfterViewInit(): void {
    this.filterForm = this.sidebarComponent.filterForm;
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.pagerSubscription.unsubscribe();
    // this.querySubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
  }

  private getFilterParameters() {
    return {
      pageNumber: this.pageNumber - 1,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
      sexes: this.searchedSexes,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      searchedLensColors: this.searchedLensColors,
      searchedFrameColors: this.searchedFrameColors,
      searchedFrameMaterials: this.searchedFrameMaterials,
      searchedDiopters: this.searchedDiopters,
      searchedPolarization: this.polarization
    };
  }

  private loadProducts() {
    this.isLoading = true;
    console.log('LAUNCH LOAD PRODUCTS!');

    this.productsService.getFilteredProducts(this.getFilterParameters())
      // .pipe(takeWhile(() => !this.productsSubscription.closed))
      .pipe(delay(200))
      .subscribe(products => {
          this.products = products.content;
          console.log('<<<MY PRODUCTS', products.content);
          this.pagerService.changeTotalItems(products.totalElements);
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            Object.keys(error.error.errors).forEach(serverField => {
              if (serverField === 'minPrice') {
                this.productsService.getMinPrice().subscribe(minPrice => {
                  this.filterForm.controls.minPrice.setValue(minPrice);
                  this.sidebarComponent.doPriceFilter();
                });
              } else if (serverField === 'maxPrice') {
                this.productsService.getMaxPrice().subscribe(maxPrice => {
                  this.filterForm.controls.maxPrice.setValue(maxPrice);
                  this.sidebarComponent.doPriceFilter();
                });
              }
            });
          }
        });
  }
}
