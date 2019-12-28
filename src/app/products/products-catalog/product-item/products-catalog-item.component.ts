import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {CartService} from '../../../shared/app-services/cart.service';

@Component({
  selector: 'app-products-catalog-item',
  templateUrl: './products-catalog-item.component.html',
  styleUrls: ['./products-catalog-item.component.scss']
})
export class ProductsCatalogItemComponent implements OnInit {

  @Input() productInput: Product;
  imageUrl: string;
  price: number;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {

    if (this.productInput.imageName === undefined) {

      const mainImageIndex = this.productInput.images.findIndex(value => value.mainImage = true);
      if (this.productInput.images.length === 0) {
        this.imageUrl = `/api/product-image/HTB1B6T6LXXXXXXhaXXXq6xXFXXXD.jpg`;
      } else {
        this.imageUrl = `/api/product-image/${this.productInput.images[mainImageIndex].imageName}`;
      }
    } else {

      if (this.productInput.imageName === null) {
        this.imageUrl = `/api/product-image/HTB1B6T6LXXXXXXhaXXXq6xXFXXXD.jpg`;
      } else {
        this.imageUrl = `/api/product-image/${this.productInput.imageName}`;
      }
    }
  }

  addItem(uuid: string, quantity: number) {
    this.cartService.addItem(uuid, quantity);
  }
}
