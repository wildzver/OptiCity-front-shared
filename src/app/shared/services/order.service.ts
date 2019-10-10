import {Injectable} from '@angular/core';
import {ProductsService} from './products.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  private orderUrl = '/api/orders';

  public createOrder(order) {
    const url = `${this.orderUrl}/addOrder`;
    return this.http.post<Order>(url, order);
  }

}
