import {Injectable} from '@angular/core';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})

export class CartLocalStorageService {
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
