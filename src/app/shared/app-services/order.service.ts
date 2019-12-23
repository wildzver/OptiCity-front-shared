import {Injectable} from '@angular/core';
import {ProductsService} from './products.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
import {Order} from '../models/order';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  private orderUrl = '/api/orders';

  public createOrder(order: Order): Observable<HttpResponse<{}>> {
    const url = `${this.orderUrl}/addOrder`;
    return this.http.post<HttpResponse<{}>>(url, order);
  }

}
