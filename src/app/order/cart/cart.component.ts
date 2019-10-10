import {AfterContentChecked, Component, Injectable, OnInit} from '@angular/core';
import {CartItem} from '../../shared/models/cart-item';
import {ProductsService} from '../../shared/services/products.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Order} from '../../shared/models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
@Injectable({
  providedIn: 'root',
})

export class CartComponent implements OnInit, AfterContentChecked, CanActivate {


  static quantityTotal: number;

  public get staticQuantityTotal() {
    return CartComponent.quantityTotal;
  }

  items: CartItem[] = [];
  total: number;
  name: string;
  imageUrl: string;
  subTotal: number;

  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const cart: Order = JSON.parse(localStorage.getItem('_cart'));
    if (cart != null) {
      this.loadCart();
    }
    console.log('this.staticQuantityTotal', CartComponent.quantityTotal);
  }

  ngAfterContentChecked() {
    const cart: Order = this.getCartLocalStorage();

    this.items.reduce((runningValue: number, item: CartItem) => {
      return (CartComponent.quantityTotal = runningValue + item.quantity);
    }, 0);
    this.items.reduce((runningValue: number, item: CartItem) => {
      return this.total = runningValue + (item.product.productDetails.price * item.quantity);
    }, 0);

    if (cart === null) {
      CartComponent.quantityTotal = 0;
    }
    if (cart != null) {
      if (cart.orderList.length === 0) {
        CartComponent.quantityTotal = 0;
        this.total = 0;
      }
      cart.quantityTotal = this.staticQuantityTotal;
      cart.total = this.total;
      this.setCartLocalStorage(cart);
    }
    console.log('qwerty!', CartComponent.quantityTotal);
  }

  private getCartLocalStorage() {
    return JSON.parse(localStorage.getItem('_cart'));
  }

  private setCartLocalStorage(cart: Order) {
    localStorage.setItem('_cart', JSON.stringify(cart));
  }

  addItem(productNumber: string) {
    this.productsService.getProductByProductNumber(productNumber).subscribe(value => {
      const mainImageIndex = value.images.findIndex(value2 => value2.mainImage = true);
      this.imageUrl = `/api/product-image/${value.images[mainImageIndex].imageName}`;
      const item: CartItem = {
        product: {
          productNumber: value.productNumber,
          images: [{imageName: value.images[mainImageIndex].imageName}],
          category: {uaName: value.category.uaName},
          productDetails: {price: value.productDetails.price}
        },
        quantity: 1,
        subTotal: value.productDetails.price * 1
      };

      if (localStorage.getItem('_cart') === null) {
        const cart: Order = new Order(null, [], 0, 0);
        cart.orderList.push(item);
        cart.quantityTotal = CartComponent.quantityTotal;
        cart.total = this.total;
        this.setCartLocalStorage(cart);
      } else {
        const cart: Order = this.getCartLocalStorage();
        let index = -1;
        for (let i = 0; i < cart.orderList.length; i++) {
          const item: CartItem = cart.orderList[i];
          if (item.product.productNumber === productNumber) {
            index = i;
            break;
          }
        }
        if (index === -1) {
          cart.orderList.push(item);
          this.setCartLocalStorage(cart);
        } else {
          const item: CartItem = (cart.orderList[index]);
          item.quantity += 1;
          cart.orderList[index] = (item);
          this.setCartLocalStorage(cart);
        }
      }
      // CartComponent.quantityTotal += 1;
      // localStorage.setItem('_cart_size', JSON.stringify(JSON.parse(localStorage.getItem('_cart_size')) + 1));

    });
    console.log('LOCALSTORAGE!!!' + this.getCartLocalStorage());
  }

  onChangeQuantity(item: CartItem) {
    // const cart: CartItem[] = [];
    const cart: Order = new Order(null, [], 0, 0);
    console.log('THIS IS PRODUCTNUMBER!!!' + item.product.productNumber);
    const carta: Order = this.getCartLocalStorage();
    for (const cI of carta.orderList) {
      if (cI.product.productNumber === item.product.productNumber) {
        cI.quantity = item.quantity;
        cI.subTotal = item.quantity * item.product.productDetails.price;
      }
      cart.orderList.push(cI);
    }
    console.log('SUBTOTAL!', this.subTotal);
    this.setCartLocalStorage(cart);
  }

  private loadCart(): void {
    const cart: Order = this.getCartLocalStorage();
    this.items = cart.orderList;
    for (const itemCart of cart.orderList) {
      console.log('ITEMS AFTER PUSH!!!', this.items);
      console.log('TOTAL!', this.total);
    }
  }

  private removeItemByProductNumber(productNumber: string): void {
    const cart: Order = this.getCartLocalStorage();
    const index = -1;
    for (let i = 0; i < cart.orderList.length; i++) {
      const item: CartItem = (cart.orderList[i]);
      if (item.product.productNumber === productNumber) {
        cart.orderList.splice(i, 1);
        break;
      }
    }
    this.setCartLocalStorage(cart);
    this.loadCart();
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('_cart') != null) {
      console.log('CART EXIST!!!');
      return true;
    }
    this.router.navigate(['/products']);
    console.log('NO CART!!!');

    return false;
  }
}
