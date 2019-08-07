import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../shared/models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../shared/services/products.service';
import {Subscription} from 'rxjs';
import {Image} from '../shared/models/image';
import {upperCase} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private currentProduct: Product;
  private currentProductImages: Image[];
  private auxiliaryProducts: Product[];
  // {
  //   productDetails: {},
  //   category: {},
  //   lensColor: {},
  //   frameColor: {},
  //   productNumber: '',
  //   images: [{}]
  // };
  private category: string;
  private productNumber: string;
  private subscription: Subscription;
  parameters: Array<{ name: string, value: any }>;
  private mainImageUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService) {
    this.subscription = route.params.subscribe(params => {
      this.category = params.category;
      this.productNumber = params.productNumber;
      console.log('PARAMS!!!', params.category, params.productNumber);
    });
  }

  ngOnInit() {
    this.getProductDetails(this.category, this.productNumber);

    // console.log('THIS IS PRODUCT!', this.product);
  }

  private getProductDetails(category, productNumber) {
    this.productService.getProductsByModelNumberThroughProductNumber(category, productNumber).subscribe(data => {
      this.currentProduct = data.find(value => value.productNumber === this.productNumber);
      this.currentProductImages = data.find(value => value.productNumber === this.productNumber).images;
      this.auxiliaryProducts = data.filter(value => value.productNumber !== this.productNumber);
      console.log('This is auxiliaryProducts!!!', this.auxiliaryProducts);
      console.log(data.filter(value => value.productNumber !== this.productNumber));
      console.log(this.currentProduct.mainImage)
      // this.product.productDetails = data.productDetails,
      //   this.product.category = data.category,
      //   this.product.lensColor = data.lensColor,
      //   this.product.frameColor = data.frameColor,
      //   this.product.productNumber = data.productNumber,
      //   this.product.images = data.images;
      this.getParametersArray(this.currentProduct);
      this.navigate();
      // const mainImageIndex = this.currentProductImages.findIndex(value => value.mainImage = true);
      this.mainImageUrl = `http://localhost:8080/product-image/${this.findMainImage(this.currentProduct)}`;
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
      {name: 'Колір лінзи:', value: ['чорний', 'сірий', 'білий', 'жовтий', 'коричневий']},
      {name: 'Ширина лінзи:', value: product.productDetails.lensWidth},
      {name: 'Висота лінзи:', value: product.productDetails.lensHeight},
      {name: 'Матеріал лінзи:', value: product.productDetails.lensMaterial},
      {name: 'Ширина загальна:', value: product.productDetails.totalWidth},
      {name: 'Довжина дужки:', value: product.productDetails.bracketLength},
      {name: 'Колір оправи:', value: ''},
      {name: 'Матеріал оправи:', value: product.productDetails.frameMaterial},
      {name: 'Виробник:', value: product.productDetails.origin},
    ];
  }

  private navigate() {
    this.router.navigateByUrl(this.router.url.replace(this.category, this.currentProduct.category.name));
  }
}
