import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
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
  @ViewChild('imageContainer') imageContainerElem: ElementRef;
  screenWidth = window.innerWidth;

  isLoading = false;

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.isLoading = this.homeCatalogComponent.isLoading;
    this.setBannerContainerHeight();
  }

  ngAfterViewChecked(): void {
    this.isLoading = this.homeCatalogComponent.isLoading;
  }

  setBannerContainerHeight() {
    let height = '100vh';
    if (this.screenWidth < 1280) {
      height = this.screenWidth * 2 / 3 + 'px';
    }
    this.renderer.setStyle(this.imageContainerElem.nativeElement, 'height', height);
  }

  @HostListener('window:resize', ['$event'])
  onScreenResize() {
    this.screenWidth = window.innerWidth;
    this.setBannerContainerHeight();
  }

  scrollToHomeCatalog() {
    const homeCatalogTop = document.getElementById('home-catalog').offsetTop;
    window.scrollTo({behavior: 'smooth', top: homeCatalogTop - 60});
  }
}
