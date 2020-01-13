import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Product} from '../models/product';
import {Category} from '../models/category';
import {Color} from '../models/color';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {Params} from '@angular/router';
import {PageProduct} from '../models/pageProduct';
import {Material} from '../models/material';
import {Diopter} from '../models/diopter';
import {Origin} from '../models/origin';
import {Sex} from '../models/sex';
import {Image} from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  private productsUrl = '/api/products';
  private categoriesUrl = '/api/products/categories';
  private lensColorsUrl = '/api/products/lens-colors';
  private frameColorsUrl = '/api/products/frame-colors';
  private lensMaterialUrl = '/api/products/lens-materials';
  private frameMaterialUrl = '/api/products/frame-materials';
  private diopterUrl = '/api/products/diopters';
  private originUrl = '/api/products/origins';
  private sexUrl = '/api/products/sex';

  public getProductsByCategory(category, parameters?: Params): Observable<PageProduct> {
    const url = `${this.productsUrl}/${category}`;
    let productParams = new HttpParams();
    if (!_.isUndefined(parameters)) {
      productParams = _.isUndefined(parameters.pageNumber) ? productParams : productParams.append('pageNumber', parameters.pageNumber);
      productParams = _.isUndefined(parameters.pageSize) ? productParams : productParams.append('pageSize', parameters.pageSize);
      productParams = _.isUndefined(parameters.sortBy) ? productParams : productParams.append('sortBy', parameters.sortBy);
      productParams = _.isUndefined(parameters.sortDirection) ? productParams : productParams.append('sortDirection', parameters.sortDirection);
      productParams = _.isUndefined(parameters.sexes) ? productParams : productParams.append('sex', parameters.sexes);
      productParams = _.isUndefined(parameters.minPrice) || _.isNull(parameters.minPrice) ? productParams : productParams.append('minPrice', parameters.minPrice);
      productParams = _.isUndefined(parameters.maxPrice) || _.isNull(parameters.maxPrice) ? productParams : productParams.append('maxPrice', parameters.maxPrice);
      productParams = _.isUndefined(parameters.searchedLensColors) ? productParams : productParams.append('lensColor', parameters.searchedLensColors);
      productParams = _.isUndefined(parameters.searchedFrameColors) ? productParams : productParams.append('frameColor', parameters.searchedFrameColors);
      productParams = _.isUndefined(parameters.searchedFrameMaterials) ? productParams : productParams.append('frameMaterial', parameters.searchedFrameMaterials);
      productParams = _.isUndefined(parameters.searchedDiopters) ? productParams : productParams.append('diopter', parameters.searchedDiopters);
      productParams = _.isUndefined(parameters.searchedPolarization) ? productParams : productParams.append('polarization', parameters.searchedPolarization);
    }
    return this.http.get<PageProduct>(url, {params: productParams});
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

  public getMinPrice(): Observable<number> {
    const url = `${this.productsUrl}/getMinPrice`;
    return this.http.get<number>(url);
  }

  public getMaxPrice(): Observable<number> {
    const url = `${this.productsUrl}/getMaxPrice`;
    return this.http.get<number>(url);
  }

  public getSearchedPagedProducts(parameters: Params): Observable<PageProduct> {
    const url = `${this.productsUrl}/searchPaged`;
    let productParams = new HttpParams();
    if (!_.isUndefined(parameters)) {
      productParams = _.isUndefined(parameters.search) ? productParams : productParams.append('searchParameter', parameters.search);
      productParams = _.isUndefined(parameters.pageNumber) ? productParams : productParams.append('pageNumber', parameters.pageNumber);
      productParams = _.isUndefined(parameters.pageSize) ? productParams : productParams.append('pageSize', parameters.pageSize);
      productParams = _.isUndefined(parameters.sortBy) ? productParams : productParams.append('sortBy', parameters.sortBy);
      productParams = _.isUndefined(parameters.sortDirection) ? productParams : productParams.append('sortDirection', parameters.sortDirection);
      productParams = _.isUndefined(parameters.sexes) ? productParams : productParams.append('sex', parameters.sexes);
      productParams = _.isUndefined(parameters.minPrice) || _.isNull(parameters.minPrice) ? productParams : productParams.append('minPrice', parameters.minPrice);
      productParams = _.isUndefined(parameters.maxPrice) || _.isNull(parameters.maxPrice) ? productParams : productParams.append('maxPrice', parameters.maxPrice);
      productParams = _.isUndefined(parameters.searchedLensColors) ? productParams : productParams.append('lensColor', parameters.searchedLensColors);
      productParams = _.isUndefined(parameters.searchedFrameColors) ? productParams : productParams.append('frameColor', parameters.searchedFrameColors);
      productParams = _.isUndefined(parameters.searchedFrameMaterials) ? productParams : productParams.append('frameMaterial', parameters.searchedFrameMaterials);
      productParams = _.isUndefined(parameters.searchedDiopters) ? productParams : productParams.append('diopter', parameters.searchedDiopters);
      productParams = _.isUndefined(parameters.searchedPolarization) ? productParams : productParams.append('polarization', parameters.searchedPolarization);
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
      productParams = _.isUndefined(parameters.sexes) ? productParams : productParams.append('sex', parameters.sexes);
      productParams = _.isUndefined(parameters.minPrice) || _.isNull(parameters.minPrice) ? productParams : productParams.append('minPrice', parameters.minPrice);
      productParams = _.isUndefined(parameters.maxPrice) || _.isNull(parameters.maxPrice) ? productParams : productParams.append('maxPrice', parameters.maxPrice);
      productParams = _.isUndefined(parameters.searchedLensColors) ? productParams : productParams.append('lensColor', parameters.searchedLensColors);
      productParams = _.isUndefined(parameters.searchedFrameColors) ? productParams : productParams.append('frameColor', parameters.searchedFrameColors);
      productParams = _.isUndefined(parameters.searchedFrameMaterials) ? productParams : productParams.append('frameMaterial', parameters.searchedFrameMaterials);
      productParams = _.isUndefined(parameters.searchedDiopters) ? productParams : productParams.append('diopter', parameters.searchedDiopters);
      productParams = _.isUndefined(parameters.searchedPolarization) ? productParams : productParams.append('polarization', parameters.searchedPolarization);
    }
    return this.http.get<PageProduct>(this.productsUrl, {params: productParams});
  }

  public getProductsByModelNumberThroughProductNumber(category?, productNumber?): Observable<Product[]> {
    const url = `${this.productsUrl}/${category}/${productNumber}`;
    return this.http.get<Product[]>(url);
  }

  public getProductsByModelNumber(modelNumber): Observable<Product[]> {
    const url = `${this.productsUrl}/modelNumbers/${modelNumber}`;
    return this.http.get<Product[]>(url);
  }

  public getFreeModelNumber(): Observable<number> {
    const url = `${this.productsUrl}/addProduct/getFreeModelNumber`;
    return this.http.get<number>(url);
  }

  public getProductByUUID(uuid): Observable<Product> {
    const url = `${this.productsUrl}/cart/${uuid}`;
    return this.http.get<Product>(url);
  }

  public getProductByUUIDList(formData: FormData): Observable<HttpEvent<{}>> {
    const url = `${this.productsUrl}/UUIDList`;
    const req = new HttpRequest(
      'post',
      url,
      formData
    );
    return this.http.request(req);
  }

  public getProductById(id): Observable<Product> {
    const url = `${this.productsUrl}/admin/${id}`;
    return this.http.get<Product>(url);
  }

  public getProductsWithoutImages(): Observable<Product[]> {
    const url = `${this.productsUrl}/productsWithoutImages`;
    return this.http.get<Product[]>(url);
  }

  public createProduct(formData: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest(
      'post',
      this.productsUrl + '/addProduct',
      formData,
      {reportProgress: true});
    return this.http.request(req);
  }

  public updateProduct(productId: string, formData: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest(
      'post',
      `${this.productsUrl}/${productId}/update`,
      formData,
      {reportProgress: true});
    return this.http.request(req);
  }

  public uploadProducts(formData: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest(
      'post',
      this.productsUrl + '/uploadProducts',
      formData,
      {reportProgress: true, responseType: 'json'},
    );
    const res = new HttpResponse();
    return this.http.request(req);
  }

  public uploadProductImages(productId: number, formData: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest(
      'post',
      `${this.productsUrl}/${productId}/uploadProductImages`,
      formData,
      {reportProgress: true});
    return this.http.request(req);
  }

  public getProductImages(productId: number): Observable<Image[]> {
    const url = `${this.productsUrl}/${productId}/images`;
    return this.http.get<Image[]>(url);
  }

  public deleteProductImage(productId, imageId) {
    return this.http.get<Image[]>(`${this.productsUrl}/${productId}/images/${imageId}/delete`);
  }

  public deleteProduct(product) {
    return this.http.delete(this.productsUrl + '/' + product.id + '/delete');
  }

  public getCategories() {
    return this.http.get<Category[]>(this.categoriesUrl, {responseType: 'json'});
  }

  public getCategoryByName(categoryName): Observable<Category> {
    let categoryNameParam = new HttpParams();
    if (!_.isUndefined(categoryName)) {
      categoryNameParam = _.isUndefined(categoryName) ? categoryNameParam : categoryNameParam.append('categoryName', categoryName);
    }
    return this.http.get<Category>(this.categoriesUrl + '/categoryByName', {params: categoryNameParam});
  }

  public createCategory(formData: FormData) {
    return this.http.post<Category>(this.categoriesUrl + '/add', formData);
  }

  public updateCategory(formData: FormData, category: Category) {
    return this.http.put<Category>(this.categoriesUrl + '/' + category.id + '/update', formData);
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

  public createFrameColor(formData: FormData) {
    return this.http.post<Color>(this.frameColorsUrl + '/add', formData);
  }

  public updateFrameColor(formData: FormData, frameColor: Color) {
    return this.http.put<Color>(this.frameColorsUrl + '/' + frameColor.id + '/update', formData);
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

  public createLensColor(formData: FormData) {
    return this.http.post<Color>(this.lensColorsUrl + '/add', formData);
  }

  public updateLensColor(formData: FormData, lensColor: Color) {
    return this.http.put<Color>(this.lensColorsUrl + '/' + lensColor.id + '/update', formData);
  }

  public deleteLensColor(lensColor) {
    return this.http.delete(this.lensColorsUrl + '/' + lensColor.id + '/delete');
  }

  public getLensMaterials() {
    return this.http.get<Material[]>(this.lensMaterialUrl);
  }

  public getLensMaterial(lensMaterial) {
    return this.http.get<Material>(this.lensMaterialUrl + lensMaterial.id);
  }

  public createLensMaterial(lensMaterial) {
    return this.http.post<Material>(this.lensMaterialUrl + '/add', lensMaterial);
  }

  public updateLensMaterial(lensMaterial: Material) {
    return this.http.put<Material>(this.lensMaterialUrl + '/' + lensMaterial.id + '/update', lensMaterial);
  }

  public deleteLensMaterial(lensMaterial) {
    return this.http.delete(this.lensMaterialUrl + '/' + lensMaterial.id + '/delete');
  }

  public getFrameMaterials() {
    return this.http.get<Material[]>(this.frameMaterialUrl);
  }

  public getFrameMaterial(frameMaterial) {
    return this.http.get<Material>(this.frameMaterialUrl + frameMaterial.id);
  }

  public createFrameMaterial(frameMaterial) {
    return this.http.post<Material>(this.frameMaterialUrl + '/add', frameMaterial);
  }

  public updateFrameMaterial(frameMaterial: Material) {
    return this.http.put<Material>(this.frameMaterialUrl + '/' + frameMaterial.id + '/update', frameMaterial);
  }

  public deleteFrameMaterial(frameMaterial) {
    return this.http.delete(this.frameMaterialUrl + '/' + frameMaterial.id + '/delete');
  }

  public getDiopters() {
    return this.http.get<Diopter[]>(this.diopterUrl);
  }

  public getDiopter(diopter) {
    return this.http.get<Diopter>(this.diopterUrl + diopter.id);
  }

  public createDiopter(diopter) {
    return this.http.post<Diopter>(this.diopterUrl + '/add', diopter);
  }

  public updateDiopter(diopter: Diopter) {
    return this.http.put<Diopter>(this.diopterUrl + '/' + diopter.id + '/update', diopter);
  }

  public deleteDiopter(diopter) {
    return this.http.delete(this.diopterUrl + '/' + diopter.id + '/delete');
  }

  public getOrigins() {
    return this.http.get<Origin[]>(this.originUrl);
  }

  public getOrigin(origin) {
    return this.http.get<Origin>(this.originUrl + origin.id);
  }

  public createOrigin(origin) {
    return this.http.post<Origin>(this.originUrl + '/add', origin);
  }

  public updateOrigin(origin: Origin) {
    return this.http.put<Origin>(this.originUrl + '/' + origin.id + '/update', origin);
  }

  public deleteOrigin(origin) {
    return this.http.delete(this.originUrl + '/' + origin.id + '/delete');
  }

  public getSexes() {
    return this.http.get<Sex[]>(this.sexUrl);
  }

  public createSex(sex) {
    return this.http.post<Sex>(this.sexUrl + '/add', sex);
  }

  public updateSex(sex: Sex) {
    return this.http.put<Sex>(this.sexUrl + '/' + sex.id + '/update', sex);
  }

  public deleteSex(sex) {
    return this.http.delete(this.sexUrl + '/' + sex.id + '/delete');
  }
}
