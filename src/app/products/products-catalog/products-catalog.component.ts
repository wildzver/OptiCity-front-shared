import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductsService} from '../../shared/services/products.service';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit, AfterViewInit {

  @ViewChild(SidebarComponent)
  private sidebar: SidebarComponent;
  products = Product[''];
  minPrice: number;
  maxPrice: number;
  searchedLensColors = new Array<number>();
  searchedFrameColors = new Array<number>();
  showExtendedItem: boolean;

  constructor(private router: Router,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.loadProducts();
    this.showExtendedItem = false;

  }

  private loadProducts() {
    const parameters = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      searchedLensColors: this.searchedLensColors,
      searchedFrameColors: this.searchedFrameColors
    };

    this.productsService.getProducts(parameters)
      .subscribe(data => {
        this.products = data;
        console.log(parameters);
        console.log('PRODUCT-CATALOG!!', this.products, this.minPrice, this.maxPrice, this.searchedLensColors, this.searchedFrameColors);
      });
  }

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
        this.minPrice = this.sidebar.minPrice;
        this.maxPrice = this.sidebar.maxPrice;
        this.searchedLensColors = this.sidebar.searchedLensColors;
        this.searchedFrameColors = this.sidebar.searchedFrameColors;
        console.log(this.maxPrice);
        this.router.events.pipe(
          filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
            this.loadProducts();
          }
        );
      }
    );
  }

  onMouse(div: string) {
    console.log("mouse enter : " + div);

  }
}
