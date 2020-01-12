import {Component, HostListener, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../../shared/app-services/products.service';
import {Subscription} from 'rxjs';
import {Image} from '../../../shared/models/image';
import {CartService} from '../../../shared/app-services/cart.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class ProductDetailsComponent implements OnInit {

  currentProduct: Product;
  diopters: string;
  currentProductImages: Image[];
  auxiliaryProducts: Product[];
  category: string;
  productNumber: string;
  subscription: Subscription;
  mainImageUrl: string;
  mainImageName: string;
  lensColorUrl = '/api/lensColor-image/';
  frameColorUrl = '/api/frameColor-image/';
  showSlider = false;
  showSpinner = false;

  // /api/products/categories?category=veloglasses&productNumber=1
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService,
              private cartService: CartService) {
    this.subscription = route.params.subscribe(params => {
      this.category = params.category;
      this.productNumber = params.productNumber;
    });
  }

  @HostListener
  ('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.fetchPreviousImage();
    }

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.fetchNextImage();
    }

    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.closeSlider();
    }
  }

  ngOnInit() {
    this.showSpinner = true;
    this.route.params.subscribe(queryParams => {
      this.getProductDetails(queryParams.category, queryParams.productNumber);
    });
  }

  private getProductDetails(category, productNumber) {
    this.productService.getProductsByModelNumberThroughProductNumber(category, productNumber).subscribe(data => {
      this.currentProduct = data.find(value => value.productNumber === this.productNumber);
      this.currentProductImages = data.find(value => value.productNumber === this.productNumber).images;
      this.auxiliaryProducts = data.filter(value => value.productNumber !== this.productNumber);
      this.getDiopterValues();
      this.navigate();
      this.mainImageUrl = `/api/product-image/${this.findMainImage(this.currentProduct)}`;
      this.showSpinner = false;
    });
  }

  private findMainImage(product: Product) {
    const mainImage = product.images.find(image => image.mainImage === true);
    return mainImage ? mainImage.imageName : product.images[0].imageName;
  }

  private getDiopterValues() {
    this.diopters = this.currentProduct.diopters
      .map(diopter => {
        return diopter.value;
      }).toString().split(',').join(', ');
  }

  private navigate() {
    this.router.navigateByUrl(this.router.url.replace(this.category, this.currentProduct.productDetails.category.name));
  }

  private changeImage(imageName: string) {
    this.mainImageUrl = `/api/product-image/${imageName}`;
    this.mainImageName = imageName;
    this.changeAddedImgsContainerLocation();
  }

  private openSlider() {
    this.showSlider = true;
  }

  private closeSlider() {
    this.showSlider = false;
  }

  private currentImagePosition() {
    return this.currentProductImages.findIndex(image => image.imageName === this.mainImageName);
  }

  private fetchPreviousImage() {
    let previousImageName: string;

    if (this.currentImagePosition() <= 0) {
      previousImageName = this.currentProductImages[this.currentProductImages.length - 1].imageName;
    } else {
      previousImageName = this.currentProductImages[this.currentImagePosition() - 1].imageName;
    }
    this.changeImage(previousImageName);
  }

  private fetchNextImage() {
    let nextImageName: string;

    if (this.currentImagePosition() + 1 >= this.currentProductImages.length) {
      nextImageName = this.currentProductImages[0].imageName;
    } else {
      nextImageName = this.currentProductImages[this.currentImagePosition() + 1].imageName;
    }
    this.changeImage(nextImageName);
  }

  private changeAddedImgsContainerLocation() {
    const addedImgsElem = document.getElementById('added-imgs');
    const addedImgsContainerElem = document.getElementById('added-imgs-container');
    let leftValue = '0px';
    if (addedImgsElem.offsetWidth >= addedImgsContainerElem.offsetWidth) {
      if (this.currentImagePosition() > 3 && this.currentImagePosition() < (this.currentProductImages.length - 2)) {
        leftValue = (0 - (this.currentImagePosition() - 3) * 104).toString().concat('px');
      } else if (this.currentImagePosition() == (this.currentProductImages.length - 1)) {
        leftValue = (0 - (this.currentProductImages.length - 6) * 104).toString().concat('px');
      }
    }
    addedImgsElem.style.left = leftValue;
  }

  addItem(uuid: string, quantity: number) {
    this.cartService.addItem(uuid, quantity);
  }
}
