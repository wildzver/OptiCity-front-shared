import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {Order} from '../shared/models/order';
import {CartItem} from '../shared/models/cart-item';
import {OrderService} from '../shared/services/order.service';
import {CartComponent} from './cart/cart.component';
import {Adress} from '../shared/models/adress';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked {

  @ViewChild(OrderDetailsComponent) buyerContactsComponent;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cartComponent: CartComponent
  ) {
  }

  buyerContacts: User;
  userComment: string;
  deliveryAdress: Adress;
  totalCartQuantity: number;
  isBuyerContactsFormValid: boolean;
  isDeliveryAdressFormValid = false;
  showOrderDetails: false;


  ngOnInit() {
  }

  clearCart(): void {
    localStorage.removeItem('_cart');
    this.router.navigate(['/products']);
  }

  order() {
    console.log('this.buyerContacts EXIST3!!!', this.buyerContacts);
    const cart: Order = JSON.parse(localStorage.getItem('_cart'));

    const order: Order = {
      user: {
        firstName: this.buyerContacts.firstName,
        lastName: this.buyerContacts.lastName,
        email: this.buyerContacts.email,
        phone: this.buyerContacts.phone,
      },
      orderList: [],
      // quantityTotal: cart.quantityTotal,
      // total: cart.total,
      comment: this.userComment,
      adress: {
        settlement: this.deliveryAdress.settlement,
        branch: this.deliveryAdress.branch
      }
    };

    for (const cartItem of cart.orderList) {
      const orderListItem: CartItem = {
        product: {productNumber: cartItem.product.productNumber},
        quantity: cartItem.quantity,
        // subTotal: cartItem.subTotal
      };
      order.orderList.push(orderListItem);
    }

    console.log('ORDER FOR ORDER!', order);

    this.orderService.createOrder(order).subscribe((value) => {
      console.log(value),
        alert('Замовлення здійснено успішно! Протягом доби з Вами зв`яжеться менеджер.');
    });
  }

  ngAfterViewInit(): void {
    this.buyerContacts = this.buyerContactsComponent.buyerContacts;
    console.log('this.buyerContacts EXIST1!!!', this.buyerContactsComponent.buyerContacts);
    this.userComment = this.buyerContactsComponent.userComment;
    console.log('this.userComment EXIST!!!', this.buyerContactsComponent.userComment);
    this.deliveryAdress = this.buyerContactsComponent.deliveryAdress;
    this.isBuyerContactsFormValid = this.buyerContactsComponent.isBuyerContactsFormValid;
    this.isDeliveryAdressFormValid = this.buyerContactsComponent.isDeliveryAdressFormValid;
  }

  ngAfterViewChecked(): void {
    this.buyerContacts = this.buyerContactsComponent.buyerContacts;
    console.log('this.buyerContacts EXIST2!!!', this.buyerContactsComponent.buyerContacts);
    this.userComment = this.buyerContactsComponent.userComment;
    console.log('this.userComment EXIST!!!', this.buyerContactsComponent.userComment);
    this.isBuyerContactsFormValid = this.buyerContactsComponent.isBuyerContactsFormValid;
    this.isDeliveryAdressFormValid = this.buyerContactsComponent.isDeliveryAdressFormValid;
    this.deliveryAdress = this.buyerContactsComponent.deliveryAdress;
  }

  ngAfterContentChecked(): void {
    this.cartComponent.ngOnInit();
    this.cartComponent.ngAfterContentChecked();
    this.totalCartQuantity = CartComponent.quantityTotal;
    this.isDeliveryAdressFormValid = this.buyerContactsComponent.isDeliveryAdressFormValid;
  }
}
