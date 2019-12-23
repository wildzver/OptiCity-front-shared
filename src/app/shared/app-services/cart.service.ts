import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {Order} from '../models/order';
import {CartItem} from '../models/cart-item';
import {ProductsService} from './products.service';
import {Product} from '../models/product';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  static cart: Order = null;

  public get cart() {
    return CartService.cart;
  }

  private cartSource = new BehaviorSubject(this.localStorageService.getCartLocalStorage());
  currentCart = this.cartSource.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private productsService: ProductsService
  ) {
    this.cartSource.next(
      this.localStorageService.getCartLocalStorage() ? this.localStorageService.getCartLocalStorage() : null
    );

    this.currentCart.subscribe(cart => {
      console.log('my CART LOC STOR!!!???', localStorageService.getCartLocalStorage());
      console.log('my CART!!!???', cart);

      CartService.cart = cart;
    });
  }

  changeCart(cart: Order) {
    this.localStorageService.setCartLocalStorage(cart);
    this.cartSource.next(cart);
  }

  createEmptyCart() {
    return new Order(null, [], 0, 0);
  }

  initCartItem(product: Product, quantity: number) {
    const mainImage = product.images.find(image => image.mainImage === true);
    const item: CartItem = {
      product: {
        uuid: product.uuid,
        productNumber: product.productNumber,
        images: [{imageName: mainImage ? mainImage.imageName : product.images[0].imageName}],
        productDetails: {
          price: product.productDetails.price,
          category: {uaName: product.productDetails.category.uaName}
        }
      },
      quantity,
      subTotal: product.productDetails.price * quantity
    };
    return item;
  }

  initCart() {
    if (CartService.cart && CartService.cart.orderList.length) {
      CartService.cart.orderList.reduce((runningValue: number, item: CartItem) => {
        CartService.cart.total = runningValue + item.subTotal;
        return CartService.cart.quantityTotal = runningValue + item.quantity;
      }, 0);

      CartService.cart.orderList.reduce((runningValue: number, item: CartItem) => {
        return CartService.cart.total = runningValue + item.subTotal;
      }, 0);
    } else {
      CartService.cart.quantityTotal = 0;
      CartService.cart.total = 0;
    }
  }

  getProductByUUID(uuid) {
    console.log('123');
    let cartItem: CartItem = null;
    this.productsService.getProductByUUID(uuid).subscribe(product => {
      cartItem = this.initCartItem(product, 1);
    });
    return cartItem;
  }

  addItem(uuid: string, quantity: number) {
    console.log('cart.getValue>>', CartService.cart);
    if (CartService.cart === null) {
      CartService.cart = this.createEmptyCart();
      // const item = this.getProductByUUID(uuid);
      this.productsService.getProductByUUID(uuid).subscribe(product => {
        const cartItem: CartItem = this.initCartItem(product, quantity);
        console.log('cartItem??', cartItem);

        CartService.cart.orderList.push(cartItem);
        this.initCart();
        this.changeCart(CartService.cart);
      });
    } else {
      let index = -1;
      for (let i = 0; i < CartService.cart.orderList.length; i++) {
        // const item: CartItem = this.cartItems[i];
        if (CartService.cart.orderList[i].product.uuid === uuid) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        this.productsService.getProductByUUID(uuid).subscribe(product => {
          const cartItem: CartItem = this.initCartItem(product, quantity);
          console.log('cartItem??', cartItem);
          CartService.cart.orderList.push(cartItem);
          this.initCart();
          this.changeCart(CartService.cart);
        });
      } else {
        const item: CartItem = (CartService.cart.orderList[index]);
        item.quantity += quantity;
        item.subTotal = item.quantity * item.product.productDetails.price;
        CartService.cart.orderList[index] = item;
        this.initCart();
        this.changeCart(CartService.cart);
      }
    }
  }

  removeItemByUUID(uuid: string): void {
    for (let i = 0; i < CartService.cart.orderList.length; i++) {
      const item: CartItem = CartService.cart.orderList[i];
      if (item.product.uuid === uuid) {
        CartService.cart.orderList.splice(i, 1);
        this.initCart();
        this.changeCart(CartService.cart);
        break;
      }
    }
  }

  syncProducts() {
    const uuidList: string[] = CartService.cart.orderList.map(cartItem => cartItem.product.uuid);
    const json = JSON.stringify(uuidList);
    const blob = new Blob([json], {type: 'application/json'});
    const formData = new FormData();
    formData.append('uuidList', blob);

    this.productsService.getProductByUUIDList(formData).subscribe((products: HttpResponse<{}>) => {
      // let productsInput: Product[];
      // productsInput = products.body;
      if (products.body) {
        const productsInput = products.body as Product[];
        console.log('productsInput??>>', productsInput);
        for (let i = 0; i < CartService.cart.orderList.length; i++) {
          // .forEach(cartItem => {
          const pI = productsInput.find(productInput => productInput.uuid === CartService.cart.orderList[i].product.uuid);
          if (pI) {
            CartService.cart.orderList[i] = this.initCartItem(pI, CartService.cart.orderList[i].quantity);
            console.log('this.initCartItem(pI)', this.initCartItem(pI, CartService.cart.orderList[i].quantity));
          }
          // });
          this.initCart();
          this.changeCart(CartService.cart);
          console.log('CartService.cart>>>', CartService.cart.orderList);
        }
      }
    });
  }
}
