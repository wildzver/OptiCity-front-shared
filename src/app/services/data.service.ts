// import {Injectable} from '@angular/core';
// import {IOrder} from '../shared/models/IOrder';
// import {HttpClient, HttpErrorResponse} from '@angular/common/http';
// import {Observable, pipe} from 'rxjs';
// import {IProduct} from '../shared/models/IProduct';
// import {IPagedResults} from '../shared/models/IPagedResults';
// import {catchError, map} from 'rxjs/operators';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {
//
//   productsBaseURL = '/api/products';
//   ordersBaseURL = '/api/orders';
//   orders: IOrder[];
//
//   constructor(private http: HttpClient) {
//   }
//
//   getProductsPage(page: number, pageSize: number): Observable<IPagedResults<IProduct[]>> {
//     return this.http.get<IProduct[]>(
//       `${this.productsBaseURL}/page/${page}/${pageSize}`,
//       {observe: 'response'})
//       .pipe(
//         map(res => {
//           const totalRecords = +res.headers.get('X-InlineCount');
//           const products = res.body as IProduct[];
//           return {
//             results: products,
//             totalRecords: totalRecords
//           };
//         }),
//         catchError(this.handleError)
//       );
//   }
//
//   getProducts(): Observable<IProduct[]> {
//     return this.http.get<IProduct[]>(this.productsBaseURL)
//       .pipe(
//         map(products => {
//           return products;
//         }),
//         catchError(this.handleError)
//       );
//   }
//
//   getProduct(id: number): Observable<IProduct> {
//     return this.http.get<IProduct>(this.productsBaseURL + '/' + id)
//       .pipe(
//         map(product => {
//           return product;
//         }),
//         catchError(this.handleError)
//       );
//   }
//
//
//   private handleError(error: HttpErrorResponse) {
//     console.error('server error:', error);
//     if (error.error instanceof Error) {
//       const errMessage = error.error.message;
//       return Observable.throw(errMessage);
//       // Use the following instead if using lite-server
//       // return Observable.throw(err.text() || 'backend server error');
//     }
//     return Observable.throw(error || 'Node.js server error');
//   }
// }
