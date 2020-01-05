import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../../shared/app-services/products.service';
import {Product} from '../../shared/models/product';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {MatAutocompleteTrigger} from '@angular/material';
import {CloseScrollStrategy, Overlay} from '@angular/cdk/overlay';
import {HeaderComponent} from '../header.component';
import {filter} from 'rxjs/operators';

export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
  providers: [
    //   {provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue: {autoActiveFirstOption: true}}
// { provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }
  ]
})

export class SearchPanelComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  searchForm: FormGroup;
  products: Product[];
  numberOfResults = 5;
  imageUrl = 'http://opticityback-env.gw7hzrtssp.us-east-2.elasticbeanstalk.com/api/product-image/';

  constructor(private fb: FormBuilder,
              private productsService: ProductsService,
              private router: Router,
              private route: ActivatedRoute,
              private header: HeaderComponent
  ) {
  }

  ngOnInit() {
    this.initSearchForm();
    this.searchForm.controls.search.valueChanges
      .subscribe(searchParam => {
        const parameters = {
          search: searchParam,
          numberOfResults: this.numberOfResults
        };
        this.productsService.getSearchedProducts(parameters)
          .subscribe(searchedProducts => {
            this.products = searchedProducts;
          });
      });

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
      const searchParam = this.route.snapshot.queryParamMap.get('search');
      if (searchParam) {
        this.searchForm.controls.search.setValue(searchParam);
      }
    });
  }

  closeResponsiveHeader() {
    this.header.closeResponsiveHeader();
  }

  doSearchQuery() {
    const searchParams: string[] = this.searchForm.controls.search.value.toString().split(' ');
    this.router.navigate(['/search'], {
      relativeTo: this.route,
      queryParams: {search: searchParams},
      queryParamsHandling: 'merge'
    });
  }

  private initSearchForm() {
    this.searchForm = this.fb.group({
      search: new FormControl('')
    });
  }

  selectProduct(productCategoryName: string, productNumber: string) {
    this.router.navigate([`/products/${productCategoryName}/${productNumber}`]);
  }

  getSearchedPagedProducts() {
    this.doSearchQuery();
  }

  searchAllProducts() {
    this.doSearchQuery();
    this.autocomplete.closePanel();
  }

  clearSearch() {
    this.searchForm.controls.search.reset('');
  }
}
