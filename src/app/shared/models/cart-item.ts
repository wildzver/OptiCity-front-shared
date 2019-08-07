import {Product} from './product';

export class CartItem {
  // public productNumber?: string;
  // public image?: any;
  // public name?: string;
  // public price?: number;
  public product?: Product;
  public quantity?: number;
  public subTotal?: number;

  constructor(product?: Product, quantity?: number, subTotal?: number) {
    this.product = product;
    this.quantity = quantity;
    this.subTotal = subTotal;
  }


  // constructor(productNumber?: string, image?: any, name?: string, price?: number, quantity?: number, subTotal?: number) {
  //   this.productNumber = productNumber;
  //   this.image = image;
  //   this.name = name;
  //   this.price = price;
  //   this.quantity = quantity;
  //   this.subTotal = subTotal;
  // }
}
