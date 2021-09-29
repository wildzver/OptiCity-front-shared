import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SeoService} from './shared/app-services/seo.service';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade',
      [
        state('void', style({opacity: 0})),
        transition(':enter', [animate(300)]),
        transition(':leave', [animate(500)]),
      ]
    )
  ]
})
export class AppComponent implements OnInit {
  @ViewChild('stickyMenu') menuElement: ElementRef;
  isStartPage: boolean;

  @HostListener('window: scroll', ['$event'])
  onWindowScroll(e) {
    if (this.isStartPage) {
      const windowScroll = window.pageYOffset;
      const headerElement = document.getElementById('header');
      const startImgElement = document.getElementById('main-img').getBoundingClientRect();
      const startImgBottom = startImgElement.bottom;
      if ((startImgBottom - document.getElementById('page-wrap').clientHeight) <= 0) {
        headerElement.classList.add('sticky');
        headerElement.style.backgroundColor = 'rgba(0, 44, 64, 1)';
      } else {
        headerElement.classList.remove('sticky');
      }
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    )
      .subscribe((event) => {
        this.seoService.updateTitle(event.title);

        this.seoService.updateOgUrl(event.ogUrl);
        this.seoService.updateOgImage(event.ogImage);
        // Updating Description tag dynamically with title
        this.seoService.updateDescription(event.description);
      });
  }

  onActivate(event) {
    const headerElement = document.getElementById('header');
    if (event.constructor.name === 'HomeComponent') {
      headerElement.style.backgroundColor = 'rgba(0, 44, 64, 0)';
      this.isStartPage = true;
    } else {
      headerElement.classList.add('sticky');
      headerElement.style.backgroundColor = 'rgba(0, 44, 64, 1)';
      this.isStartPage = false;
    }
  }
}
