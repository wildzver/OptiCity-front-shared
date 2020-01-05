import {Component, Injectable, OnInit} from '@angular/core';
import {CartItem} from '../../shared/models/cart-item';
import {ProductsService} from '../../shared/app-services/products.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {Order} from '../../shared/models/order';
import {CartLocalStorageService} from '../../shared/app-services/cart-local-storage.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {CartService} from '../../shared/app-services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', animate(500)),
    ])
  ]
})

@Injectable({
  providedIn: 'root',
})

export class CartComponent implements OnInit, CanActivate {
  cart: Order = new Order();
  total: number;
  imageUrl = 'http://opticityback-env.gw7hzrtssp.us-east-2.elasticbeanstalk.com/api/product-image/';
  fadeOutTrigger: string;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: CartLocalStorageService,
    private cartService: CartService
  ) {
    cartService.syncProducts();
  }

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => setTimeout(() => this.cart = cart, 500));
  }

  onChangeQuantity(item: CartItem) {
    for (const cartItem of CartService.cart.orderList) {
      if (cartItem.product.uuid === item.product.uuid) {
        cartItem.quantity = item.quantity;
        cartItem.subTotal = item.quantity * item.product.productDetails.price;
      }
    }
    this.cartService.initCart();
    this.cartService.changeCart(CartService.cart);
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorageService.getCartLocalStorage() != null) {
      return true;
    }

    this.router.navigate(['/products']);
    return false;
  }
}
