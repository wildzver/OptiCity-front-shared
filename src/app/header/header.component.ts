import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CartComponent} from '../order/cart/cart.component';
import {CartItem} from '../shared/models/cart-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  private service;
  totalCartQuantity: number;

  constructor(private cartComponent: CartComponent) {
    // this.cartComponent.currentQuantityTotal.subscribe((x: number) => {
    //   this.totalCartQuantiry = x;
    //   console.log('123', x);
    // });
    // console.log('QuantityTOTAL!!!', this.totalCartQuantiry);
    // this.totalCartQuantity = CartComponent.quantityTotal;
    // this.totalCartQuantity = this.cartComponent.staticQuantityTotal;
  }

  ngOnInit(): void {
    // this.totalCartQuantity = this.cartComponent.staticQuantityTotal;

    // this.totalCartQuantiry = JSON.parse(localStorage.getItem('_cart_size'));

    // this.cartComponent.example().subscribe((x: number) => {
    //   this.totalCartQuantiry = x;
    //   console.log('123', x);
    // });
    // this.cartComponent.readQT();
    //
    // console.log('QuantityTOTAL!!!', this.cartComponent.readQT());
  }

  ngAfterContentChecked(): void {


    this.cartComponent.ngOnInit();

    this.cartComponent.ngAfterContentChecked();
    this.totalCartQuantity = CartComponent.quantityTotal;

    // if (JSON.parse(localStorage.getItem('_cart')) === null) {
    //   localStorage.removeItem('_cart_size');
    // }
    //
    // this.totalCartQuantiry = JSON.parse(localStorage.getItem('_cart_size'));
    // this.readMsg();
  }


}
