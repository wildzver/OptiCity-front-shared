import {Component, Inject, Injectable, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../shared/services/products.service';
import {Product} from '../shared/models/product';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocompleteTrigger} from '@angular/material';
import {CloseScrollStrategy, Overlay} from '@angular/cdk/overlay';

export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
  //   {provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue: {autoActiveFirstOption: true}}
// { provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }

]
  // encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;


  searchForm: FormGroup;
  products = Product[''];
  numberOfResults = 5;

  search = new FormControl('');

  constructor(private fb: FormBuilder,
              private productsService: ProductsService,
              private router: Router,
              private route: ActivatedRoute
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


    // this.search = (text$: Observable<Product>) =>
    //   text$.pipe(
    //     debounceTime(200),
    //     distinctUntilChanged(),
    //     switchMap(searchText => searchText === '' ? [] : this.productsService.getSearchedProducts({search: searchText}))
    //   );


    // const mainImageIndex = this.productInput.images.findIndex(value => value.mainImage = true);
    // if (this.productInput.images.length === 0) {
    //   this.imageUrl = `/api/product-image/5d1dc3e46d1bd680503848.jpg`;
    // } else {
    //   this.imageUrl = `/api/product-image/${this.productInput.images[mainImageIndex].imageName}`;
    // }

  }

  doSearchQuery() {
    const searchParams: string[] = this.searchForm.controls.search.value.toString().split(' ');
    this.router.navigate(['/products'], {
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
    // this.router.navigate([`/products/${productCategoryName}/${productNumber}`]);
    this.router.navigate([`/products/${productCategoryName}/${productNumber}`]);
    console.log('SELECTED' + productCategoryName, productNumber);
  }

  getSearchedProducts() {
    this.doSearchQuery();

    const parameters = {
      search: this.searchForm.controls.search.value
    };

    this.productsService.getSearchedProducts(parameters)
      .subscribe(searchedProducts => {
        this.products = searchedProducts;
      });
    console.log('SEARCH SUBMIT WORKS!');
  }

  searchAllProducts() {
    this.doSearchQuery();
    this.autocomplete.closePanel();
  }

  clearSearch() {
    this.searchForm.controls.search.reset('');
    this.doSearchQuery();
  }
}
