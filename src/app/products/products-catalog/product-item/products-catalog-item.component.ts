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


  constructor(private cartComponent: CartComponent) {}

  ngOnInit() {
    const mainImageIndex = this.productInput.images.findIndex(value => value.mainImage = true);
    this.imageUrl = `http://localhost:8080/product-image/${this.productInput.images[mainImageIndex].imageName}`;
    this.showExtendedItem = false;
  }

  addToCart(productNumber: string) {
    this.cartComponent.addItem(productNumber)
    console.log('productAddedToCart!!!');
    console.log(productNumber);
  }
}
