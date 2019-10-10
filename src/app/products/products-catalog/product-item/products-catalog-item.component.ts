import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductsService} from '../../../shared/services/products.service';
import {CartComponent} from '../../../order/cart/cart.component';

@Component({
  selector: 'app-products-catalog-item',
  templateUrl: './products-catalog-item.component.html',
  styleUrls: ['./products-catalog-item.component.scss']
})
export class ProductsCatalogItemComponent implements OnInit {

  @Input() productInput: Product;
  imageUrl: string;
  showExtendedItem: boolean;


  constructor(private cartComponent: CartComponent) {
  }

  ngOnInit() {
    const mainImageIndex = this.productInput.images.findIndex(value => value.mainImage = true);
    if (this.productInput.images.length === 0) {
      this.imageUrl = `/api/product-image/5d1dc3e46d1bd680503848.jpg`;
    } else {
      this.imageUrl = `/api/product-image/${this.productInput.images[mainImageIndex].imageName}`;
    }
    this.showExtendedItem = false;
  }

  addToCart(productNumber: string) {
    this.cartComponent.addItem(productNumber);
    console.log('productAddedToCart!!!');
    console.log('--->', productNumber);
  }
}
