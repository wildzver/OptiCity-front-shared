import {Product} from './product';

export class CartItem {
  public product?: Product;
  public quantity?: number;
  public subTotal?: number;

  constructor(product?: Product, quantity?: number, subTotal?: number) {
    this.product = product;
    this.quantity = quantity;
    this.subTotal = subTotal;
  }
}
