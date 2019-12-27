import {Product} from './product';

export class PageProduct {
  content: Product[];
  totalPages: number;
  totalElements: number;
  size: number;
  sort: string;
}
