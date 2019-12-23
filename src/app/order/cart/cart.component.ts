import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Injectable, Input, OnInit} from '@angular/core';
import {CartItem} from '../../shared/models/cart-item';
import {ProductsService} from '../../shared/app-services/products.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  Router,
  RouterEvent,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Order} from '../../shared/models/order';
import {LocalStorageService} from '../../shared/app-services/local-storage.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Product} from '../../shared/models/product';
import {AppPage} from '../../../../e2e/src/app.po';
import {PageEvent} from '@angular/material';
import {filter} from 'rxjs/operators';
import {HttpEvent, HttpResponse} from '@angular/common/http';
import {CartService} from '../../shared/app-services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
@Injectable({
  providedIn: 'root',
})

export class CartComponent implements OnInit, CanActivate {
  cart: Order;
  // static quantityTotal: number;

  // quantityTota: number;



  // public get staticQuantityTotal() {
  //   return CartComponent.quantityTotal;
  // }

  total: number;
  imageUrl = 'http://localhost:8080/api/product-image/';

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private cartService: CartService
  ) {
    cartService.syncProducts();
  }

  ngOnInit() {
    const totalQuantitySubscription = this.cartService.currentCart.subscribe(cart => {
      this.cart = this.localStorageService.getCartLocalStorage();
      console.log('cart in CART COMP', cart);
    });

    // this.loadCart();
    const snapshot = this.router.url;
    console.log('snapshot>>', snapshot);
    console.log('url is active>>', this.router.isActive(snapshot, true));
    console.log('url component>>', this.activatedRoute.routeConfig);
    // this.syncProducts();
    // this.router.events.pipe(
    //   filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
    //
    //   this.syncProducts();
    //   // this.loadCart()
    // });
    // this.cartSubscription
      // .add(this.totalQuantitySubscription)
      // .add(this.cartItemsSubscription);
  }

  onActivate(event) {
    console.log('event on activate', event);
  }

  // ngAfterContentChecked() {

    // const cart: Order = this.localStorageService.getCartLocalStorage();
    //
    // this.cartItems.reduce((runningValue: number, item: CartItem) => {
    //   this.cartService.changeQuantityTotal(runningValue + item.quantity);
    //   return (CartComponent.quantityTotal = runningValue + item.quantity);
    // }, 0);
    // this.cartItems.reduce((runningValue: number, item: CartItem) => {
    //   return this.total = runningValue + (item.product.productDetails.price * item.quantity);
    // }, 0);
    //
    // if (cart === null) {
    //   this.cartService.changeQuantityTotal(0);
    //   CartComponent.quantityTotal = 0;
    // }
    // if (cart != null && cart.orderList) {
    //   if (cart.orderList.length === 0) {
    //     this.cartService.changeQuantityTotal(0);
    //     CartComponent.quantityTotal = 0;
    //     this.total = 0;
    //   }
    //   cart.quantityTotal = this.staticQuantityTotal;
    //   cart.total = this.total;
    //   this.localStorageService.setCartLocalStorage(cart);
    // }
  // }

  // addItem(uuid: string, quantity: number) {
  //   this.cartService.addItem(uuid, quantity);
    // this.productsService.getProductByUUID(uuid).subscribe(product => {
    //   const mainImageIndex = product.images.findIndex(image => image.mainImage = true);
    //   const item: CartItem = {
    //     product: {
    //       uuid: product.uuid,
    //       productNumber: product.productNumber,
    //       images: [{imageName: product.images[mainImageIndex].imageName}],
    //       productDetails: {
    //         price: product.productDetails.price,
    //         category: {uaName: product.productDetails.category.uaName}
    //       }
    //     },
    //     quantity: 1,
    //     subTotal: product.productDetails.price * 1
    //   };
    //   let cart: Order = this.localStorageService.getCartLocalStorage();
    //
    //   // if (cart === null) {
    //   //   cart = new Order(null, [], 0, 0);
    //   //   cart.orderList.push(item);
    //   //   // cart.quantityTotal = CartComponent.quantityTotal;
    //   //   cart.quantityTotal = this.quantityTota;
    //   //   cart.total = this.total;
    //   //   this.localStorageService.setCartLocalStorage(cart);
    //   // } else {
    //   if (cart === null) {
    //     cart = new Order(null, [], 0, 0);
    //     cart.orderList.push(item);
    //     this.cartService.changeCartItems(this.cartItems);
    //     // cart.quantityTotal = CartComponent.quantityTotal;
    //     cart.quantityTotal = this.quantityTota;
    //     cart.total = this.total;
    //     this.localStorageService.setCartLocalStorage(cart);
    //   } else {
    //     let index = -1;
    //     // for (let i = 0; i < cart.orderList.length; i++) {
    //     //   const item: CartItem = cart.orderList[i];
    //     //   if (item.product.uuid === uuid) {
    //     //     index = i;
    //     //     break;
    //     //   }
    //     // }
    //     for (let i = 0; i < this.cartItems.length; i++) {
    //       const item: CartItem = this.cartItems[i];
    //       if (item.product.uuid === uuid) {
    //         index = i;
    //         break;
    //       }
    //     }
    //     if (index === -1) {
    //       cart.orderList.push(item);
    //       this.localStorageService.setCartLocalStorage(cart);
    //     } else {
    //       const item: CartItem = (this.cartItems[index]);
    //       item.quantity += quantity;
    //       cart.orderList[index] = (item);
    //       this.localStorageService.setCartLocalStorage(cart);
    //     }
    //     // if (index === -1) {
    //     //   cart.orderList.push(item);
    //     //   this.localStorageService.setCartLocalStorage(cart);
    //     // } else {
    //     //   const item: CartItem = (cart.orderList[index]);
    //     //   item.quantity += quantity;
    //     //   cart.orderList[index] = (item);
    //     //   this.localStorageService.setCartLocalStorage(cart);
    //     // }
    //   }
    //   this.loadCart();
    // });
  // }

  onChangeQuantity(item: CartItem) {
    // const cart: CartItem[] = [];
    // const cart: Order = new Order(null, [], 0, 0);
    console.log('THIS IS PRODUCTNUMBER!!!' + item.product.productNumber);
    console.log('THIS IS UUID!!!' + item.product.uuid);
    for (const cartItem of CartService.cart.orderList) {
      if (cartItem.product.uuid === item.product.uuid) {
        cartItem.quantity = item.quantity;
        cartItem.subTotal = item.quantity * item.product.productDetails.price;
      }
      // cart.orderList.push(cartItem);
    }
    this.cartService.initCart();
    this.cartService.changeCart(CartService.cart);
  }

  // removeItemByUUID(uuid: string): void {
  //   // const cart: Order = this.localStorageService.getCartLocalStorage();
  //   const index = -1;
  //   for (let i = 0; i < CartService.cart.orderList.length; i++) {
  //     const item: CartItem = CartService.cart.orderList[i];
  //     if (item.product.uuid === uuid) {
  //       CartService.cart.orderList.splice(i, 1);
  //       this.initCart();
  //       this.changeCart(CartService.cart);
  //       break;
  //     }
  //   }
  // }

  // private loadCart(): void {
  //   const cart: Order = this.localStorageService.getCartLocalStorage();
  //   if (cart != null) {
  //     this.cartItems = cart.orderList;
  //     for (const itemCart of cart.orderList) {
  //       console.log('ITEMS AFTER PUSH!!!', this.cartItems);
  //       console.log('TOTAL!', this.total);
  //     }
  //   }
  // }

  // private syncProducts() {
  //   const cart: Order = this.localStorageService.getCartLocalStorage();
  //   if (this.router.url === '/cart') {
  //     const uuidList: string[] = this.cartItems.map(cartItem => cartItem.product.uuid);
  //     console.log('uuidList>>', uuidList);
  //     // localStorage.removeItem('_cart');
  //     // uuidList.map(uuid => {
  //     const firstItem = uuidList[0];
  //     console.log('firstItem>>>', firstItem);
  //     const currentItemQuantity = this.cartItems.find(cartItem => cartItem.product.uuid === firstItem).quantity;
  //     console.log('currentItemQuantity>>>', currentItemQuantity);
  //
  //     // this.removeItemByUUID(firstItem);
  //     console.log('firstItem2>>>', firstItem);
  //     this.addItem(firstItem, currentItemQuantity);
  //     console.log('firstItem3>>>', firstItem);
  //     const uuidList2: string[] = this.cartItems.map(cartItem => cartItem.product.uuid);
  //     console.log('uuidList>>', uuidList2);

      // });
      // this.loadCart();
      // let productsInput = Product[''];
      // const json = JSON.stringify(uuidList);
      // const blob = new Blob([json], {type: 'application/json'});
      // const formData = new FormData();
      //
      // formData.append('uuidList', blob);
      // this.productsService.getProductByUUIDList(formData).subscribe((products: HttpResponse<{}>) => {
      //   productsInput = products.body as Product[];
      //   console.log('products.body typeof' + typeof products.body);
      //   this.cartItems.forEach(cartItem => {
      //     if (productsInput) {
      //       const currentProductInput = productsInput.find(product => product.uuid === cartItem.product.uuid);
      //       if (currentProductInput) {
      //         cartItem.product.productDetails.category = currentProductInput.productDetails.category;
      //         cartItem.product.productNumber = currentProductInput.productNumber;
      //         cartItem.product.productDetails.price = currentProductInput.productDetails.price;
      //       }
      //     }
      //   });
      //   console.log('Products Input>>', products);
      //   console.log('myProducts>>', productsInput);
      //   console.log('my NEW CART ITEMS>>', this.cartItems);
      // });
      //
      // if (cart) {
      //   cart.orderList.forEach(cartItem => {cartItem.product}) = productsInput;
      //   this.localStorageService.setCartLocalStorage(cart);
      // }
  //   }
  // }

  // private removeItemByUUID(uuid: string): void {
  //   const cart: Order = this.localStorageService.getCartLocalStorage();
  //   const index = -1;
  //   for (let i = 0; i < cart.orderList.length; i++) {
  //     const item: CartItem = (cart.orderList[i]);
  //     if (item.product.uuid === uuid) {
  //       cart.orderList.splice(i, 1);
  //       break;
  //     }
  //   }
  //   this.localStorageService.setCartLocalStorage(cart);
  //   this.loadCart();
  // }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorageService.getCartLocalStorage() != null) {
      return true;
    }

    this.router.navigate(['/products']);
    return false;
  }

  // ngAfterViewInit(): void {
  //   this.cdRef.detectChanges();
  //
  // }
}
