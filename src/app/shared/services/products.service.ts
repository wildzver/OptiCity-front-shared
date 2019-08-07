import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Product} from '../models/product';
import {Category} from '../models/category';
import {Color} from '../models/color';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {ParamMap, Params} from '@angular/router';
import {defaultIfEmpty} from 'rxjs/operators';


const header = new HttpHeaders({'Content-Type': 'application/json'});
const header2 = new HttpHeaders({'Content-Type': 'multipart/formdata'});

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  private productsUrl = 'http://localhost:8080/products';
  private categoriesUrl = 'http://localhost:8080/products/categories';
  private frameColorsUrl = 'http://localhost:8080/products/frame-colors';
  private lensColorsUrl = 'http://localhost:8080/products/lens-colors';

  // public createProduct(product, progress) {
  //   return this.http.post<Product>(this.productUrl + '/addProduct', product, progress);
  // }

  // public getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productsUrl);
  // }

  public getProductsByCategory(category): Observable<Product[]> {
    const url = `${this.productsUrl}/${category}`;
    return this.http.get<Product[]>(url);
  }

  public getProducts(parameters?: Params): Observable<Product[]> {
    let productParams = new HttpParams();
    if (!_.isUndefined(parameters)) {
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
    return this.http.get<Product[]>(this.productsUrl, {params: productParams});
  }

  public getProductsByModelNumberThroughProductNumber(category?, productNumber?): Observable<Product[]> {
    const url = `${this.productsUrl}/${category}/${productNumber}`;
    return this.http.get<Product[]>(url);
  }

  public getProductByProductNumber(productNumber): Observable<Product> {
    const url = `${this.productsUrl}/cart/${productNumber}`;
    return this.http.get<Product>(url);
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

  public updateProduct(product: Product) {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put(url, JSON.stringify(product));
  }

  public deleteProduct(product) {
    return this.http.delete(this.productsUrl + '/' + product.id);
  }

  public getCategories() {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  // public getCategory(category) {
  //   return this.http.get<Category>(this.categoriesUrl + category.id);
  // }

  public createCategory(category) {
    return this.http.post<Category>(this.categoriesUrl + '/add', category);
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
