import {Type} from '@angular/core';
import {ActivatedRouteSnapshot, ActivatedRoute, UrlSegment, Params, Data, Route, ParamMap} from '@angular/router';
import {Observable, of} from 'rxjs';
import {IProduct} from './models/IProduct';
import {IPagedResults} from './models/IPagedResults';

export class MockDataService {
  constructor() {
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 1) {
      return of(products.slice(0, 1)[0]);
    } else {
      return of(null);
    }
  }

  getProductsPage(page: number, pageSize: number): Observable<IPagedResults<IProduct[]>> {
    const topVal = pageSize,
      skipVal = page,
      skip = (isNaN(skipVal)) ? 0 : +skipVal;
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > products.length) {
      top = skip + (products.length - skip);
    }

    return of({
      totalRecords: products.length,
      results: products.slice(skip, top)
    });
  }

  getProducts(): Observable<IProduct[]> {
    return of(products);
  }
}

export class MockActivatedRoute implements ActivatedRoute {
  snapshot: ActivatedRouteSnapshot;
  url: Observable<UrlSegment[]>;
  params: Observable<Params>;
  queryParams: Observable<Params>;
  fragment: Observable<string>;
  data: Observable<Data>;
  outlet: string;
  component: Type<any> | string;
  routeConfig: Route;
  root: ActivatedRoute;
  parent: ActivatedRoute;
  firstChild: ActivatedRoute;
  children: ActivatedRoute[];
  pathFromRoot: ActivatedRoute[];
  paramMap: Observable<ParamMap>;
  queryParamMap: Observable<ParamMap>;

  toString(): string {
    return '';
  }
}

export function getActivatedRouteWithParent(params: any[]) {
  const route = new MockActivatedRoute();
  route.parent = new MockActivatedRoute();
  if (params) {
    for (const param of params) {
      // var keyNames = Object.keys(param);
      route.parent.params = of(param);
    }
  }

  return route;
}

export const products = [
  {
    id: 1,
    category: 'veloglasses',
    lensColor: 'чорний',
    lensWidth: 70,
    lensHeight: 40,
    lensMaterial: 'полікарбонат',
    totalWidth: 160,
    bracketLength: 130,
    frameColor: 'чорний',
    frameMaterial: 'ацетат',
    source: '/veloglasses-catalog/2.1.11.jpg',
    article: '00011',
    price: 99,
    routerLink: '0001'
  },
  {
    id: 2,
    category: 'veloglasses',
    lensColor: 'чорний',
    lensWidth: 70,
    lensHeight: 40,
    lensMaterial: 'полікарбонат',
    totalWidth: 160,
    bracketLength: 130,
    frameColor: 'чорний',
    frameMaterial: 'ацетат',
    source: '/veloglasses-catalog/2.1.12.jpg',
    article: '00012',
    price: 99,
    routerLink: '0001'
  },
  {
    id: 3,
    category: 'veloglasses',
    lensColor: 'чорний',
    lensWidth: 70,
    lensHeight: 40,
    lensMaterial: 'полікарбонат',
    totalWidth: 160,
    bracketLength: 130,
    frameColor: 'чорний',
    frameMaterial: 'ацетат',
    source: '/veloglasses-catalog/2.1.13.jpg',
    article: '00013',
    price: 99,
    routerLink: '0001'
  },
  {
    id: 4,
    category: 'veloglasses',
    lensColor: 'чорний',
    lensWidth: 70,
    lensHeight: 40,
    lensMaterial: 'полікарбонат',
    totalWidth: 160,
    bracketLength: 130,
    frameColor: 'чорний',
    frameMaterial: 'ацетат',
    source: '/veloglasses-catalog/2.1.14.jpg',
    article: '00014',
    price: 99,
    routerLink: '0001'
  },
  {
    id: 5,
    category: 'veloglasses',
    lensColor: 'чорний',
    lensWidth: 70,
    lensHeight: 40,
    lensMaterial: 'полікарбонат',
    totalWidth: 160,
    bracketLength: 130,
    frameColor: 'чорний',
    frameMaterial: 'ацетат',
    source: '/veloglasses-catalog/2.1.15.jpg',
    article: '00015',
    price: 80,
    routerLink: '0001'
  },

];
