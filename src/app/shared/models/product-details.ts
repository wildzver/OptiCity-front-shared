import {Material} from './material';
import {Sex} from './sex';
import {Origin} from './origin';
import {Category} from './category';

export class ProductDetails {
  constructor(
    public id?: any,
    public modelNumber?: number,
    public price?: number,
    public category?: Category,
    public lensWidth?: number,
    public lensHeight?: number,
    public lensMaterial?: Material,
    public totalWidth?: number,
    public bracketLength?: number,
    public polarization?: boolean,
    public frameMaterial?: Material,
    public sex?: Sex,
    public origin?: Origin,
  ) {

  }

}
