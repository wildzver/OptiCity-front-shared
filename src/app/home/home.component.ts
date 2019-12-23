import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HomeCatalogComponent} from './home-catalog/home-catalog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild(HomeCatalogComponent) homeCatalogComponent;

  isLoading = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.isLoading = this.homeCatalogComponent.isLoading;
  }

  ngAfterViewChecked(): void {
    this.isLoading = this.homeCatalogComponent.isLoading;
  }


  private scrollToHomeCatalog() {
    const homeCatalogTop = document.getElementById('home-catalog').offsetTop;
    window.scrollTo({behavior: 'smooth', top: homeCatalogTop - 60});
    // scrollTo(0, homeCatalogTop - 60);
  }


}
