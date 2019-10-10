import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Product} from '../models/product';
import {Category} from '../models/category';
import {Color} from '../models/color';
import {observable, Observable} from 'rxjs';
import * as _ from 'lodash';
import {ParamMap, Params} from '@angular/router';
import {defaultIfEmpty} from 'rxjs/operators';
import {parseHttpResponse} from 'selenium-webdriver/http';
import {url} from '@rxweb/reactive-form-validators';
import {PageProduct} from '../models/pageProduct';


const header = new HttpHeaders({'Content-Type': 'application/json'});
const header2 = new HttpHeaders({'Content-Type': 'multipart/formdata'});

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  private productsUrl = '/api/products';
  private categoriesUrl = '/api/products/categories';
  private frameColorsUrl = '/api/products/frame-colors';
  private lensColorsUrl = '/api/products/lens-colors';

  // public createProduct(product, progress) {
  //   return this.http.post<Product>(this.productUrl + '/addProduct', product, progress);
  // }

  // public getFilteredProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productsUrl);
  // }

  public getProductsByCategory(category): Observable<Product[]> {
    const url = `${this.productsUrl}/${category}`;
    return this.http.get<Product[]>(url);
  }

  public getSearchedProducts(parameters: Params): Observable<Product[]> {
    const url = `${this.productsUrl}/search`;
    let searchParams = new HttpParams();
    if (!_.isUndefined(parameters)) {
      searchParams = _.isUndefined(parameters.search) ? searchParams : searchParams.append('searchParameter', parameters.search);
      searchParams = _.isUndefined(parameters.numberOfResults) ? searchParams : searchParams.append('numberOfResults', parameters.numberOfResults);
    }
    return this.http.get<Product[]>(url, {params: searchParams});
  }

  public getSearchedPagedProducts(parameters: Params): Observable<PageProduct> {
    const url = `${this.productsUrl}/searchPaged`;
    let productParams = new HttpParams();
    if (!_.isUndefined(parameters)) {
      productParams = _.isUndefined(parameters.search) ? productParams : productParams.append('searchParameter', parameters.search);
      productParams = _.isUndefined(parameters.pageNumber) ? productParams : productParams.append('pageNumber', parameters.pageNumber);
      productParams = _.isUndefined(parameters.pageSize) ? productParams : productParams.append('pageSize', parameters.pageSize);
    }
    return this.http.get<PageProduct>(url, {params: productParams});
  }

  public getFilteredProducts(parameters?: Params): Observable<PageProduct> {
    let productParams = new HttpParams();
    if (!_.isUndefined(parameters)) {
      productParams = _.isUndefined(parameters.pageNumber) ? productParams : productParams.append('pageNumber', parameters.pageNumber);
      productParams = _.isUndefined(parameters.pageSize) ? productParams : productParams.append('pageSize', parameters.pageSize);
      productParams = _.isUndefined(parameters.sortBy) ? productParams : productParams.append('sortBy', parameters.sortBy);
      productParams = _.isUndefined(parameters.sortDirection) ? productParams : productParams.append('sortDirection', parameters.sortDirection);
      productParams = _.isUndefined(parameters.minPrice) ? productParams : productParams.append('minPrice', parameters.minPrice);
      productParams = _.isUndefined(parameters.maxPrice) ? productParams : productParams.append('maxPrice', parameters.maxPrice);
      productParams = _.isUndefined(parameters.searchedLensColors) ? productParams : productParams.append('lensColor', parameters.searchedLensColors);
      productParams = _.isUndefined(parameters.searchedFrameColors) ? productParams : productParams.append('frameColor', parameters.searchedFrameColors);
    }
    // productParams = productParams.set('minPrice', minPrice);
    // productParams = productParams.set('maxPrice', maxPrice);
    // productParams = productParams.set('lensColor', searchedLensColors);
    // productParams = productParams.set('frameColor', searchedFrameColors);
    console.log('productParams!!!', productParams.getAll('lensColor'));
    console.log('productParams!!!', productParams);
    console.log('productParams!!!', parameters);
    return this.http.get<PageProduct>(this.productsUrl, {params: productParams});
  }

  public getProductsByModelNumberThroughProductNumber(category?, productNumber?): Observable<Product[]> {
    const url = `${this.productsUrl}/${category}/${productNumber}`;
    return this.http.get<Product[]>(url);
  }

  public getProductByProductNumber(productNumber): Observable<Product> {
    const url = `${this.productsUrl}/cart/${productNumber}`;
    return this.http.get<Product>(url);
  }

  public getProductsWithoutImages(): Observable<Product[]> {
    const url = `${this.productsUrl}/productsWithoutImages`;
    return this.http.get<Product[]>(url);
  }

  public createProduct(formData: FormData): Observable<HttpEvent<{}>> {

    // const json = JSON.stringify(product);
    // const blob = new Blob([json], {type: 'application/json'});
    // const formData = new FormData();
    //
    // formData.append('product', blob);
    // formData.append('image', file);

    const req = new HttpRequest(
      'post',
      this.productsUrl + '/addProduct',
      formData,
      {reportProgress: true});
    return this.http.request(req);
  }


  public uploadProducts(formData: FormData): Observable<HttpEvent<{}>> {
    // const url = this.productsUrl + '/uploadProducts';

    const req = new HttpRequest(
      'post',
      this.productsUrl + '/uploadProducts',
      formData,
      {reportProgress: true, responseType: 'json'},
    );
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //   }),
    //   observe: 'response',
    //   reportProgress: true, responseType: 'json'
    // };
    // console.log('THIS IS RESPONSE!' + );
    const res = new HttpResponse();
    return this.http.request(req);
    // return this.http.post(url, formData, {observe: 'response', reportProgress: true});
  }


  public uploadProductImages(formData: FormData): Observable<HttpEvent<{}>> {

    const req = new HttpRequest(
      'post',
      this.productsUrl + '/uploadProducts/uploadProductImages',
      formData,
      {reportProgress: true});
    return this.http.request(req);
  }

  public deleteProduct(product) {
    return this.http.delete(this.productsUrl + '/' + product.id);
  }

  public getCategories() {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  public getCategoryByName(categoryName): Observable<Category> {
    let categoryNameParam = new HttpParams();

    // const url = `${this.categoriesUrl}/as/${categoryName}`;
    if (!_.isUndefined(categoryName)) {
      categoryNameParam = _.isUndefined(categoryName) ? categoryNameParam : categoryNameParam.append('categoryName', categoryName);
    }

    return this.http.get<Category>(this.categoriesUrl + '/as', {params: categoryNameParam});
  }

  public createCategory(formData: FormData) {
    return this.http.post<Category>(this.categoriesUrl + '/add', formData);
  }

  public updateCategory(category: Category) {
    return this.http.put<Category>(this.categoriesUrl + '/' + category.id + '/update', category);
  }

  public deleteCategory(category) {
    return this.http.delete(this.categoriesUrl + '/' + category.id + '/delete');
  }

  public getFrameColors() {
    return this.http.get<Color[]>(this.frameColorsUrl);
  }

  public getFrameColor(frameColor) {
    return this.http.get<Color>(this.frameColorsUrl + frameColor.id);
  }

  public createFrameColor(frameColor) {
    return this.http.post<Color>(this.frameColorsUrl + '/add', frameColor);
  }

  public updateFrameColor(frameColor: Color) {
    return this.http.put<Color>(this.frameColorsUrl + '/' + frameColor.id + '/update', frameColor);
  }

  public deleteFrameColor(frameColor) {
    return this.http.delete(this.frameColorsUrl + '/' + frameColor.id + '/delete');
  }

  public getLensColors() {
    return this.http.get<Color[]>(this.lensColorsUrl);
  }

  public getLensColor(lensColor) {
    return this.http.get<Color>(this.lensColorsUrl + lensColor.id);
  }

  public createLensColor(lensColor) {
    return this.http.post<Color>(this.lensColorsUrl + '/add', lensColor);
  }

  public updateLensColor(lensColor: Color) {
    return this.http.put<Color>(this.lensColorsUrl + '/' + lensColor.id + '/update', lensColor);
  }

  public deleteLensColor(lensColor) {
    return this.http.delete(this.lensColorsUrl + '/' + lensColor.id + '/delete');
  }
}
