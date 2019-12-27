import {ProductDetails} from './product-details';
import {Color} from './color';
import {Image} from './image';
import {Diopter} from './diopter';

export class Product {
  constructor(
    public id?: any,
    public uuid?: string,
    public productDetails?: ProductDetails,
    public diopters?: Diopter[],
    public lensColor?: Color,
    public frameColor?: Color,
    public productNumber?: string,
    public price?: number,
    public imageName?: string,
    public categoryName?: string,
    public categoryUaName?: string,
    public images?: Image[],
  ) {
  }
}
