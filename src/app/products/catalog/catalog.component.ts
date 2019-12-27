import {Component, Input} from '@angular/core';
import {Product} from '../../shared/models/product';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ]),
  ]
})
export class CatalogComponent {

  @Input()
  productsInput: Product[];
}

