import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductsService} from '../../../shared/app-services/products.service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Subscription} from 'rxjs';
import {delay, filter} from 'rxjs/operators';
import {FilterService} from '../../../shared/app-services/filter.service';
import {PagerService} from '../../../shared/app-services/pager.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SidebarComponent} from '../../sidebar/sidebar.component';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-products-catalog-category',
  templateUrl: '../products-catalog.component.html',
  styleUrls: ['../products-catalog.component.scss']
})
export class ProductsCatalogCategoryComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

  @ViewChild(SidebarComponent) sidebarComponent;
  products: Product[];
  searchedSexes = new Array<any>();
  minPrice: number;
  maxPrice: number;
  searchedLensColors = new Array<number>();
  searchedFrameColors = new Array<number>();
  searchedFrameMaterials = new Array<number>();
  searchedDiopters = new Array<any>();
  filterForm: FormGroup;
  polarization: boolean;
  pageNumber: number;
  pageSize: number;
  totalItems: any;
  category: string;
  sortBy: string;
  sortDirection: string;
  isLoading = false;
  productsSubscription: Subscription;
  filterSubscription = new Subscription();
  pagerSubscription = new Subscription();
  routeCategorySubscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService,
              private filterService: FilterService,
              private pagerService: PagerService,
              private cdRef: ChangeDetectorRef,
  ) {
  }

  sexesSubscription = this.filterService.currentSearchedSexes.subscribe(sex => {
    this.searchedSexes = sex;
  });
  minPriceSubscription = this.filterService.currentMinPrice.subscribe(minPrice => {
    this.minPrice = minPrice;
  });
  maxPriceSubscription = this.filterService.currentMaxPrice.subscribe(maxPrice => this.maxPrice = maxPrice);
  lensColorsSubscription = this.filterService.currentSearchedLensColors.subscribe(searchedLensColors => {
    this.searchedLensColors = searchedLensColors;
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

  ngOnInit() {
    this.routeCategorySubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.category = params.get('category');
    });

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
    this.routeCategorySubscription.unsubscribe();
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
    this.productsService.getProductsByCategory(this.category, this.getFilterParameters())
      .pipe(delay(200))
      .subscribe(productsByCategory => {
          this.products = productsByCategory.content;
          this.pagerService.changeTotalItems(productsByCategory.totalElements);
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
