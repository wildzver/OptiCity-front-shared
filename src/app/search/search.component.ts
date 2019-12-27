import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../shared/models/product';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {ProductsService} from '../shared/app-services/products.service';
import {FilterService} from '../shared/app-services/filter.service';
import {PagerService} from '../shared/app-services/pager.service';
import {Subscription} from 'rxjs';
import {delay, filter} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  products: Product[];
  navigateTo: any[];
  search: string[];
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
  category: string;
  sortBy: string;
  sortDirection: string;
  isLoading = false;
  private querySubscription: Subscription;
  productsSubscription: Subscription;
  filterSubscription = new Subscription();
  pagerSubscription = new Subscription();
  routeCategorySubscription = new Subscription();

  sexesSubscription = this.filterService.currentSearchedSexes.subscribe(sex => {
    this.searchedSexes = sex;
  });
  minPriceSubscription = this.filterService.currentMinPrice.subscribe(minPrice => {
    this.minPrice = minPrice;
  });
  maxPriceSubscription = this.filterService.currentMaxPrice.subscribe(maxPrice => this.maxPrice = maxPrice);
  searchedLensColorsSubscription = this.filterService.currentSearchedLensColors.subscribe(searchedLensColors => {
    this.searchedLensColors = searchedLensColors;
  });
  searchedFrameColorsSubscription = this.filterService.currentSearchedFrameColors.subscribe(searchedFrameColors => {
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService,
              private filterService: FilterService,
              private pagerService: PagerService,
  ) {
  }

  ngOnInit() {

    this.querySubscription = this.route.queryParams.subscribe((queryParams: any) => {
      this.search = queryParams.search;
    });

    this.routeCategorySubscription = this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.navigateTo = [`/products/${this.category}`];
    });

    this.filterSubscription
      .add(this.sexesSubscription)
      .add(this.minPriceSubscription)
      .add(this.maxPriceSubscription)
      .add(this.searchedLensColorsSubscription)
      .add(this.searchedFrameColorsSubscription)
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

  ngOnDestroy(): void {
    this.pagerSubscription.unsubscribe();
    this.routeCategorySubscription.unsubscribe();
    this.querySubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
  }

  private getSearchParameters() {
    return {
      search: '',
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

    if (this.search) {
      const parameters = this.getSearchParameters();
      if (this.search.length === 1) {
        parameters.search = this.search.toString();
      }

      if (this.search.length > 1) {
        parameters.search = this.search.toString().split(',').join(' ');
      }

      this.productsService.getSearchedPagedProducts(parameters)
        .pipe(delay(200))
        .subscribe(data => {
          this.products = data.content;
          this.pagerService.changeTotalItems(data.totalElements);
          this.isLoading = false;
        });
    }
  }
}
