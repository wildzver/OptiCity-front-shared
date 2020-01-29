import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Order} from '../models/order';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  private orderUrl = 'https://api.opticity.com.ua/api/orders';

  public createOrder(order: Order): Observable<HttpResponse<{}>> {
    const url = `${this.orderUrl}/addOrder`;
    return this.http.post<HttpResponse<{}>>(url, order);
  }

}
