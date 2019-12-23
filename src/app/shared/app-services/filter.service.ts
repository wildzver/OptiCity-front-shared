import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {max} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PagerService} from './pager.service';
import {ProductsService} from './products.service';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private searchedSexesSource = new BehaviorSubject(new Array<any>());
  currentSearchedSexes = this.searchedSexesSource.asObservable();
  private minPriceSource = new BehaviorSubject(0);
  currentMinPrice = this.minPriceSource.asObservable();
  private maxPriceSource = new BehaviorSubject(100000);
  currentMaxPrice = this.maxPriceSource.asObservable();
  private searchedLensColorsSource = new BehaviorSubject(new Array<any>());
  currentSearchedLensColors = this.searchedLensColorsSource.asObservable();
  private searchedFrameColorsSource = new BehaviorSubject(new Array<any>());
  currentSearchedFrameColors = this.searchedFrameColorsSource.asObservable();
  private searchedFrameMaterialsSource = new BehaviorSubject(new Array<any>());
  currentSearchedFrameMaterials = this.searchedFrameMaterialsSource.asObservable();
  private searchedDioptersSource = new BehaviorSubject(new Array<any>());
  currentSearchedDiopters = this.searchedDioptersSource.asObservable();
  private searchedPolarizationSource = new BehaviorSubject(false);
  currentPolarization = this.searchedPolarizationSource.asObservable();
  serverMinPrice: number;
  serverMaxPrice: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {
    productsService.getMaxPrice().subscribe(maxPrice => {
      this.serverMaxPrice = maxPrice;
      console.log('maxPrice&&', maxPrice);
    });
    productsService.getMinPrice().subscribe(minPrice => {
      this.serverMinPrice = minPrice;
      console.log('minPrice&&', minPrice);
    });
    const queryParamMap: ParamMap = activatedRoute.snapshot.queryParamMap;

    this.searchedSexesSource.next(
      queryParamMap.has('sex') ? queryParamMap.getAll('sex') : new Array<any>()
    );

    this.minPriceSource.next(
      queryParamMap.has('minprice') ? parseInt(queryParamMap.get('minprice'), 10) : this.serverMinPrice
    );

    this.maxPriceSource.next(
      queryParamMap.has('maxprice') ? parseInt(queryParamMap.get('maxprice'), 10) : this.serverMaxPrice
    );

    this.searchedLensColorsSource.next(
      queryParamMap.has('lenscolor') ? queryParamMap.getAll('lenscolor') : new Array<any>()
    );

    this.searchedFrameColorsSource.next(
      queryParamMap.has('framecolor') ? queryParamMap.getAll('framecolor') : new Array<any>()
    );

    this.searchedFrameMaterialsSource.next(
      queryParamMap.has('framemat') ? queryParamMap.getAll('framemat') : new Array<any>()
    );
    this.searchedDioptersSource.next(
      queryParamMap.has('diopter') ? queryParamMap.getAll('diopter') : new Array<any>()
    );

    this.searchedPolarizationSource.next(
      queryParamMap.has('polarization') ? JSON.parse((queryParamMap.get('polarization')).toLowerCase()) : false
    );

  }

  changeSearchedSexes(searchedSexes: number[]) {
    this.searchedSexesSource.next(searchedSexes);
    console.log('MY NEW SEARCHED SEXES IN FILTER SERVICE', searchedSexes);
  }

  changeMinPrice(minPrice: number) {
    this.minPriceSource.next(minPrice);
    console.log('MY NEW MIN PRICE IN FILTER SERVICE', minPrice);
  }

  changeMaxPrice(maxPrice: number) {
    this.maxPriceSource.next(maxPrice);
    console.log('MY NEW MAX PRICE IN FILTER SERVICE', maxPrice);
  }

  changeSearchedLensColors(searchedLensColors: number[]) {
    this.searchedLensColorsSource.next(searchedLensColors);
    console.log('MY NEW SEARCHED LENS COLORS IN FILTER SERVICE', searchedLensColors);
  }

  changeSearchedFrameColors(searchedFrameColors: number[]) {
    this.searchedFrameColorsSource.next(searchedFrameColors);
    console.log('MY NEW SEARCHED FRAME COLORS IN FILTER SERVICE', searchedFrameColors);
  }

  changeSearchedFrameMaterials(searchedFrameMaterials: number[]) {
    this.searchedFrameMaterialsSource.next(searchedFrameMaterials);
    console.log('MY NEW SEARCHED FRAME MATERIALS IN FILTER SERVICE', searchedFrameMaterials);
  }

  changeSearchedDiopters(searchedDiopters: number[]) {
    this.searchedDioptersSource.next(searchedDiopters);
    console.log('MY NEW SEARCHED DIOPTERS IN FILTER SERVICE', searchedDiopters);
  }

  changeSearchedPolarization(searchedPolarization: boolean) {
    this.searchedPolarizationSource.next(searchedPolarization);
    console.log('MY NEW SEARCHED POLARIZATION IN FILTER SERVICE', searchedPolarization);
  }

}
