import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductsService} from '../../shared/services/products.service';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {PaginationComponent} from '../../shared/pagination/pagination.component';
import {Subscription} from 'rxjs';
import {SortPanelComponent} from '../../sort-panel/sort-panel.component';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit, AfterViewInit {

  products: Product[];

  search: string[];

  @ViewChild(SidebarComponent)
  private sidebar: SidebarComponent;
  minPrice: number;
  maxPrice: number;
  searchedLensColors = new Array<number>();
  searchedFrameColors = new Array<number>();


  @ViewChild(PaginationComponent)
  private paginationComponent: PaginationComponent;
  pageNumber: number;
  pageSize: number;
  totalItems: any;

  @ViewChild(SortPanelComponent)
  private sortPanelComponent: SortPanelComponent;
  sortBy: string;
  sortDirection: string;
  pageSize2: number;

  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService,
  ) {
  }

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe((queryParams: any) => {
      this.search = queryParams.search;
      console.log('MY SEARCH!' + queryParams.search);
      console.log('MY SEARCH TYPE!' + typeof queryParams.search);
    });

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
      this.minPrice = this.sidebar.minPrice;
      this.maxPrice = this.sidebar.maxPrice;
      this.searchedLensColors = this.sidebar.searchedLensColors;
      this.searchedFrameColors = this.sidebar.searchedFrameColors;
      this.pageNumber = this.paginationComponent.pageNumber;
      this.pageSize = this.paginationComponent.pageSize;

      console.log(this.maxPrice);
      this.loadProducts();
    });
  }

  private loadProducts() {
    if (this.search === undefined || (this.search !== undefined && this.search.toString() === '')) {

      const parameters = {
        pageNumber: this.pageNumber - 1,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        sortDirection: this.sortDirection,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        searchedLensColors: this.searchedLensColors,
        searchedFrameColors: this.searchedFrameColors

      };

      this.productsService.getFilteredProducts(parameters)
        .subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          console.log('TOTAL ITEMS2', this.totalItems);
          // this.pageSize = data.size;
          // this.paginationComponent.setPage(this.pageNumber);
          console.log('parameters', parameters);
          console.log('PRODUCT-CATALOG!!', this.products, this.minPrice, this.maxPrice, this.searchedLensColors, this.searchedFrameColors);
        });
    } else {
      console.log('this.search.length!!!!', this.search.length);
      console.log('this.search[0]!!!!', this.search[0]);
      console.log('this.search[1]!!!!', this.search[1]);
      let parameters;
      if (this.search.length === 1) {
        parameters = {
          search: this.search,
          pageNumber: this.pageNumber - 1,
          pageSize: this.pageSize
        };
      }

      if (this.search.length > 1) {
        parameters = {
          search: this.search.toString().split(',').join(' '),
          pageNumber: this.pageNumber - 1,
          pageSize: this.pageSize
        };
      }

      this.productsService.getSearchedPagedProducts(parameters)
        .subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          console.log('----------------]]]', data);
          console.log('-{{---------------]]]', this.products);
        });
    }

  }


  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
      this.minPrice = this.sidebar.minPrice;
      this.maxPrice = this.sidebar.maxPrice;
      this.searchedLensColors = this.sidebar.searchedLensColors;
      this.searchedFrameColors = this.sidebar.searchedFrameColors;
      this.pageNumber = this.paginationComponent.pageNumber;
      this.pageSize = this.paginationComponent.pageSize;
      this.sortBy = this.sortPanelComponent.sortBy;
      this.sortDirection = this.sortPanelComponent.sortDirection;
      console.log('PAGE NUMBER IN PRODUCTS CATALOG2', this.pageNumber);
      this.loadProducts();
    });

    this.pageNumber = this.paginationComponent.pageNumber;
    console.log('PAGE NUMBER IN PRODUCTS CATALOG', this.pageNumber);


  }
}
