import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Product} from '../shared/models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../shared/services/products.service';
import {Subscription} from 'rxjs';
import {Image} from '../shared/models/image';
import {upperCase} from '@rxweb/reactive-form-validators';
import {query} from '@angular/animations';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  currentProduct: Product;
  currentProductImages: Image[];
  auxiliaryProducts: Product[];
  category: string;
  productNumber: string;
  subscription: Subscription;
  parameters: Array<{ name: string, value: any }>;
  mainImageUrl: string;
  mainImageName: string;

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  showSlider = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService) {
    this.subscription = route.params.subscribe(params => {
      this.category = params.category;
      this.productNumber = params.productNumber;
      console.log('PARAMS!!!', params.category, params.productNumber);
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
    this.route.params.subscribe(queryParams => {
      // this.category = queryParams.category;
      // this.productNumber = queryParams.productNumber;
      this.getProductDetails(queryParams.category, queryParams.productNumber);
    });

    // console.log('THIS IS PRODUCT!', this.product);
  }


  private getProductDetails(category, productNumber) {
    this.productService.getProductsByModelNumberThroughProductNumber(category, productNumber).subscribe(data => {
      this.currentProduct = data.find(value => value.productNumber === this.productNumber);
      this.currentProductImages = data.find(value => value.productNumber === this.productNumber).images;
      this.auxiliaryProducts = data.filter(value => value.productNumber !== this.productNumber);
      // console.log('THIS IS CURRENT PRODUCT <>', this.currentProduct);
      console.log('This is auxiliaryProducts!!!', this.auxiliaryProducts);
      // console.log(data.filter(value => value.productNumber !== this.productNumber));
      // console.log(this.currentProduct.mainImage);
      // this.product.productDetails = data.productDetails,
      //   this.product.category = data.category,
      //   this.product.lensColor = data.lensColor,
      //   this.product.frameColor = data.frameColor,
      //   this.product.productNumber = data.productNumber,
      //   this.product.images = data.images;
      this.getParametersArray(this.currentProduct);
      this.navigate();
      // const mainImageIndex = this.currentProductImages.findIndex(value => value.mainImage = true);
      this.mainImageUrl = `/api/product-image/${this.findMainImage(this.currentProduct)}`;
      console.log('THIS IS DATA!', data);
    });
  }

  private findMainImage(product: Product) {
    const mainImageIndex = product.images.findIndex(value => value.mainImage = true);
    return product.images[mainImageIndex].imageName;

  }

  private getParametersArray(product: Product) {
    const mainImageIndex = this.currentProduct.images.findIndex(value => value.mainImage = true);

    this.parameters = [
      {name: 'Категорія:', value: product.category.uaName},
      {name: 'Ціна:', value: product.productDetails.price + ' грн'},
      {name: 'Колір лінзи:', value: product.lensColor.uaName},
      {name: 'Ширина лінзи:', value: product.productDetails.lensWidth},
      {name: 'Висота лінзи:', value: product.productDetails.lensHeight},
      {name: 'Матеріал лінзи:', value: product.productDetails.lensMaterial},
      {name: 'Ширина загальна:', value: product.productDetails.totalWidth},
      {name: 'Довжина дужки:', value: product.productDetails.bracketLength},
      {name: 'Колір оправи:', value: product.frameColor.uaName},
      {name: 'Матеріал оправи:', value: product.productDetails.frameMaterial},
      {name: 'Виробник:', value: product.productDetails.origin},
    ];
  }

  private navigate() {
    this.router.navigateByUrl(this.router.url.replace(this.category, this.currentProduct.category.name));
  }

  private changeImage(imageName: string) {
    this.mainImageUrl = `/api/product-image/${imageName}`;
    this.mainImageName = imageName;
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
    console.log('MY CURRENT IMAGE POSITION', this.currentImagePosition());
    this.mainImageName = previousImageName;

    this.mainImageUrl = `/api/product-image/${previousImageName}`;
  }

  private fetchNextImage() {
    let nextImageName: string;

    if (this.currentImagePosition() + 1 >= this.currentProductImages.length) {
      nextImageName = this.currentProductImages[0].imageName;
    } else {
      nextImageName = this.currentProductImages[this.currentImagePosition() + 1].imageName;
    }
    console.log('MY CURRENT IMAGE POSITION', this.currentImagePosition());
    this.mainImageName = nextImageName;

    this.mainImageUrl = `/api/product-image/${nextImageName}`;
  }

}

