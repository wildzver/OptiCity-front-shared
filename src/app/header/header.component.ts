import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from '@angular/router';
import {CartService} from '../shared/app-services/cart.service';
import {Order} from '../shared/models/order';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class HeaderComponent implements OnInit {

  showNav = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //
    //     if (event.url === '/') {
    //       console.log('MY ROUTE SUBSCRIPTION!', event);
    //     }
    //   }
    // });
    //
    // this.router.url === '' ? console.log('THIS IS ROOT ROUTE', this.router.url) : console.log('THIS IS NOT ROOT ROUTE');

  }

  toggleShowNav() {

  }
}
