import {Injectable} from '@angular/core';
import {Order} from '../models/order';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  constructor() {
  }

  public getCartLocalStorage() {
    const cart: Order = JSON.parse(localStorage.getItem('_cart'));
    return cart;
  }

  public setCartLocalStorage(order: Order) {
    localStorage.setItem('_cart', JSON.stringify(order));
  }
}
