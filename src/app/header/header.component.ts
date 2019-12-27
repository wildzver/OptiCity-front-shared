import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../shared/app-services/cart.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {KEY_CODE} from '../admin/admin-products/add-product/add-product.component';

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  private toggleResponsiveHeader() {
    document.getElementById('navbar').classList.toggle('hidden');
    document.getElementById('nav-icon').classList.toggle('open');
  }

  closeResponsiveHeader() {
    if (!document.getElementById('navbar').classList.contains('hidden') && document.getElementById('nav-icon').classList.contains('open')) {
      this.toggleResponsiveHeader();
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.closeResponsiveHeader();
    }
  }
}
