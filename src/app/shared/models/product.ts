import {ProductDetails} from './product-details';
import {Color} from './color';
import {Category} from './category';
import {Image} from './image';
import {Diopter} from './diopter';

export class Product {
  constructor(
    public id?: any,
    public uuid?: string,
    public productDetails?: ProductDetails,
  // public article?: string,
    // public price?: number,
    public diopters?: Diopter[],
    public lensColor?: Color,
    // public lensWidth?: number,
    // public lensHeight?: number,
    // public lensMaterial?: string,
    // public totalWidth?: number,
    // public bracketLength?: number,

    public frameColor?: Color,
    public productNumber?: string,
    public price?: number,
    public imageName?: string,
    public categoryName?: string,
    public categoryUaName?: string,
    public images?: Image[],
    // public frameMaterial?: string,
    // public origins?: string,
    // public source?: string,
  ) {
    // const mainImageIndex = this.images.findIndex(value => value.mainImage = true);
    //
    // this.mainImage = this.images[mainImageIndex];
  }
  // mainImage?: Image;

}
