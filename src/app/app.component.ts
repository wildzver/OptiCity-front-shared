import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DOCUMENT} from '@angular/common';
import {root} from 'rxjs/internal-compatibility';
import {Router} from '@angular/router';

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
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('stickyMenu') menuElement: ElementRef;
  // sticky = false;
  menuPosition: any;
  isStartPage: boolean;

  sectionPosition = new EventEmitter();

  @HostListener('window: scroll', ['$event'])
  onWindowScroll(e) {
    if (this.isStartPage) {
      const windowScroll = window.pageYOffset;
      console.log('windowScroll', windowScroll);
      const headerElement = document.getElementById('header');
      const startImgElement = document.getElementById('start-img').getBoundingClientRect();
      const startImgBottom = startImgElement.bottom;
      console.log ('MY START IMAGE TOP', startImgElement.bottom);
      // console.log ('MY HEADER TOP', headerElement.getBoundingClientRect().bottom );
      if ((startImgBottom - document.getElementById('page-wrap').clientHeight) <= 0) {
        headerElement.classList.add('sticky');
        headerElement.style.backgroundColor = 'rgba(0, 44, 64, 1)';
      } else {
        headerElement.classList.remove('sticky');
        // headerElement.classList.add('transparent-sticky');
        // headerElement.style.backgroundColor = 'rgba(0, 44, 64, 0.5)';

      }
    }

    //   this.menuPosition = document.getElementById('content');
    //   const element = document.getElementById('navbar');
    //   console.log('MY ELEMENT POSITION', this.menuPosition);
    // //
    //   if (windowScroll > 0) {
    //     document.getElementById('content').classList.remove('content');
    //     if (windowScroll < 80) {
    //       element.classList.remove('sticky');
    //     } else if (windowScroll >= 80) {
    //       element.classList.add('sticky');
    //     } else {
    //       element.classList.remove('sticky');
    //     }
    //   }
  }

  onActivate(event) {
    const headerElement = document.getElementById('header');
    if (event.constructor.name === 'HomeComponent') {
      console.log('MY CONSTRUCTOR NAME', event.constructor.name);
      headerElement.style.backgroundColor = 'rgba(0, 44, 64, 0)';
      this.isStartPage = true;
    } else {
      headerElement.classList.add('sticky');
      headerElement.style.backgroundColor = 'rgba(0, 44, 64, 1)';
      this.isStartPage = false;
    }
  }
  constructor(@Inject(DOCUMENT) document,
              private router: Router) {
  }

  ngOnInit(): void {

    // document.getElementById('content').classList.add('content');

    // this.sectionPosition.emit(this.menuElement.nativeElement.offsetTop);
    // console.log('SECTION POSITION!', this.sectionPosition);
    // this.menuPosition = this.menuElement.nativeElement.offsetTop;
  }

  ngAfterViewInit() {
    // this.menuPosition = document.getElementById('content').offsetTop;
    // console.log('Native element', this.menuElement.nativeElement);
    // this.sectionPosition.emit({name: this.menuElement, position: this.element.nativeElement.offsetTop});

    // this.menuPosition = this.menuElement.nativeElement.offsetTop;
    // console.log('Menu Position', this.menuPosition);
  }


}
