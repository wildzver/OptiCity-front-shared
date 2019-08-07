import {ProductDetails} from './product-details';
import {Color} from './color';
import {Category} from './category';
import {Image} from './image';

export class Product {
  constructor(
    public id?: any,
    public productDetails?: ProductDetails,
  // public article?: string,
    // public price?: number,
    public category?: Category,
    public lensColor?: Color,
    // public lensWidth?: number,
    // public lensHeight?: number,
    // public lensMaterial?: string,
    // public totalWidth?: number,
    // public bracketLength?: number,
    public frameColor?: Color,
    public productNumber?: string,
    public images?: Image[],
    // public frameMaterial?: string,
    // public origins?: string,
    // public source?: string,
  ) {
    const mainImageIndex = this.images.findIndex(value => value.mainImage = true);

    this.mainImage = this.images[mainImageIndex];
  }
  mainImage?: Image;

}
