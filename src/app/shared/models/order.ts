import {CartItem} from './cart-item';
import {User} from './user';
import {Adress} from './adress';

export class Order {
  public user?: User;
  public orderList?: CartItem[];
  public quantityTotal?: number;
  public total?: number;
  public comment?: string;
  public adress?: Adress;

  constructor(user?: User,
              orderList?: CartItem[],
              quantityTotal?: number,
              total?: number,
              comment?: string,
              adress?: Adress) {
    this.user = user;
    this.orderList = orderList;
    this.quantityTotal = quantityTotal;
    this.total = total;
    this.comment = comment;
    this.adress = adress;
  }
}
