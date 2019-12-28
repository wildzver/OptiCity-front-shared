import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {Order} from '../shared/models/order';
import {CartItem} from '../shared/models/cart-item';
import {OrderService} from '../shared/app-services/order.service';
import {Adress} from '../shared/models/adress';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {CartLocalStorageService} from '../shared/app-services/cart-local-storage.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CartService} from '../shared/app-services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class OrderComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild(OrderDetailsComponent) buyerContactsComponent;

  buyerContactsForm: FormGroup;
  buyerContacts: User;
  userComment: string;
  deliveryAdress: Adress;
  totalCartQuantity: number;
  isBuyerContactsFormValid = false;
  isDeliveryAdressFormValid = false;
  showOrderDetails = false;
  showSpinner = false;
  cart: Order;


  constructor(
    private router: Router,
    private orderService: OrderService,
    private cdRef: ChangeDetectorRef,
    private localStorageService: CartLocalStorageService,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => this.cart = cart);
  }

  order() {
    this.showSpinner = true;
    const cart: Order = this.localStorageService.getCartLocalStorage();

    const order: Order = {
      user: {
        firstName: this.buyerContacts.firstName,
        lastName: this.buyerContacts.lastName,
        email: this.buyerContacts.email,
        phone: this.buyerContacts.phone,
      },
      orderList: [],
      comment: this.userComment,
      adress: {
        settlement: this.deliveryAdress.settlement,
        branch: this.deliveryAdress.branch
      }
    };

    for (const cartItem of CartService.cart.orderList) {
      const orderListItem: CartItem = {
        product: {uuid: cartItem.product.uuid},
        quantity: cartItem.quantity,
      };
      order.orderList.push(orderListItem);
    }

    this.orderService.createOrder(order).subscribe(
      (response: HttpResponse<{}>) => {
      },
      (error: HttpErrorResponse) => {
        if (error.status === 200) {
          this.showSpinner = false;
          setTimeout(() => {
            alert('Замовлення здійснено успішно! Протягом доби з Вами зв`яжеться наш менеджер.');
          });
          const cart: Order = this.localStorageService.getCartLocalStorage();
          cart.orderList = [];
          this.localStorageService.setCartLocalStorage(cart);
          CartService.cart.orderList = [];
          this.showOrderDetails = false;
        }

        if (error.status === 400) {
          this.showSpinner = false;
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          Object.keys(error.error.errors).forEach(serverField => {
            if (serverField === 'user.firstName') {
              this.setErrorByServerField(error, serverField, 'userFirstName');
            } else if (serverField === 'user.lastName') {
              this.setErrorByServerField(error, serverField, 'userLastName');
            } else if (serverField === 'user.email') {
              this.setErrorByServerField(error, serverField, 'userEmail');
            }
          });
        }
      });
  }

  private setErrorByServerField(error: HttpErrorResponse, serverField: string, ctrlName: string): void {
    const ctrl = this.buyerContactsForm.get(ctrlName);
    const validationError = {};
    ctrl.markAsDirty();
    const errorName: string = error.error.errors[serverField];
    validationError[errorName] = true;
    ctrl.setErrors(validationError);
  }

  private scrollToOrderDetails() {
    this.cartService.syncProducts();
    this.showOrderDetails = true;
    setTimeout(() => {
      const orderDetailsElem = document.getElementById('order-details');
      const scrollTop = orderDetailsElem.offsetTop;
      window.scrollTo({behavior: 'smooth', top: scrollTop - 60});
    }, 200);
  }

  ngAfterViewInit(): void {
    if (this.buyerContactsComponent) {
      this.buyerContacts = this.buyerContactsComponent.buyerContacts;
      this.buyerContactsForm = this.buyerContactsComponent.buyerContactsForm;
      this.userComment = this.buyerContactsComponent.userComment;
      this.isBuyerContactsFormValid = this.buyerContactsComponent.isBuyerContactsFormValid;
      this.deliveryAdress = this.buyerContactsComponent.deliveryAdress;
      this.isDeliveryAdressFormValid = this.buyerContactsComponent.isDeliveryAdressFormValid;
    }
  }

  ngAfterViewChecked(): void {
    if (this.buyerContactsComponent) {
      this.buyerContacts = this.buyerContactsComponent.buyerContacts;
      this.buyerContactsForm = this.buyerContactsComponent.buyerContactsForm;
      this.userComment = this.buyerContactsComponent.userComment;
      this.isBuyerContactsFormValid = this.buyerContactsComponent.isBuyerContactsFormValid;
      this.deliveryAdress = this.buyerContactsComponent.deliveryAdress;
      this.isDeliveryAdressFormValid = this.buyerContactsComponent.isDeliveryAdressFormValid;
    }
    this.cdRef.detectChanges();
  }
}
