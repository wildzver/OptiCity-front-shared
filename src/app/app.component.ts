import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('fade',
  //     [
  //       state('void', style({opacity: 0})),
  //       transition(':enter', [animate(30)]),
  //       transition(':leave', [animate(500)]),
  //     ]
  //   )]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('stickyMenu') menuElement: ElementRef;
  // sticky = false;
  menuPosition: any;

  sectionPosition = new EventEmitter();

  // @HostListener('window: scroll', ['$event'])
  // onWindowScroll(e) {
  //   const windowScroll = window.pageYOffset;
  //   console.log('windowScroll', windowScroll);
  //   this.menuPosition = document.getElementById('content');
  //   const element = document.getElementById('navbar');
  //   console.log('MY ELEMENT POSITION', this.menuPosition);
  //
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
  // }

  constructor(@Inject(DOCUMENT) document) {
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
