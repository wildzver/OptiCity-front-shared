import {
  AfterContentChecked, AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, DoCheck,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Product} from '../models/product';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PagerService} from '../app-services/pager.service';
import {Observable, Subscription} from 'rxjs';
import {SortPanelComponent} from '../../sort-panel/sort-panel.component';
import {distinctUntilChanged, filter} from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  pager: any = {};
  pageNumber;
  pageSize;
  @Input()
  // navigateToInput: any[];
  totalItems: number;

  pagenNumberSubscription: Subscription;
  pageSizeSubscription: Subscription;
  totalItemsSubscription: Subscription;

  // get _totalItems() {
  //   return this._totalItems;
  // }
  //
  // @Input()
  // set _totalItems(value: any) {
  //   console.log('previous totalItems', this._totalItems);
  //   console.log('currently selected totalItems', this._totalItems, value);
  //   this._totalItems = value;
  //
  //   console.log('PAGENUMBER', this.pageNumber);
  //   // this.doPageQuery();
  //
  //   this.querySubscription = this.route.queryParams.subscribe(
  //     (queryParam: any) => {
  //       if (queryParam.pagenumber !== undefined) {
  //         this.pageNumber = parseInt(queryParam.pagenumber, 10);
  //         this.pageSize = queryParam.pagesize;
  //       }
  //       console.log('queryParam.pagenumber', queryParam.pagenumber);
  //       console.log('queryParam.pagesize', queryParam.pagesize);
  //     }
  //   );
  //   // if (this.querySubscription) {
  //   //   this.setPage(this.pageNumber);
  //   //   console.log('querySubscription');
  //   // } else {
  //   //   this.setPage(1);
  //   //   console.log('querySubscription-');
  //
  //   // }
  //   // if (this.pageNumber === undefined) {
  //   //   this.pageNumber = 1;
  //   //
  //   // }
  //   this.setPage(this.pageNumber);
  //
  //   // this.doPageQuery();
  // }


  // querySubscription = new Subscription();
  //
  // pagenNumberSubscription = this.pagerService.currentPageNumber.subscribe(
  //   pageNumber => {
  //     this.pageNumber = pageNumber;
  //     console.log('PAGINATION PAGE NUMBER', this.pageNumber);
  //     this.pager = this.pagerService.getPager(pageNumber, this.pageSize, this.totalItems);
  //     this.doPageQuery();
  //   });
  //
  // pageSizeSubscription = this.pagerService.currentPageSize.subscribe(
  //   pageSize => {
  //     this.pageSize = pageSize;
  //     console.log('PAGINATION - SORT PANEL PAGE SIZE', this.pageSize);
  //     this.pager = this.pagerService.getPager(this.pageNumber, pageSize, this.totalItems);
  //     this.doPageQuery();
  //   }
  // );
  //
  // totalItemsSubscription = this.pagerService.currentTotalItems.subscribe(
  //   totalItems => {
  //     this.totalItems = totalItems;
  //     this.pager = this.pagerService.getPager(this.pageNumber, this.pageSize, totalItems);
  //     // this.setPage(this.pageNumber);
  //     // this.doPageQuery();
  //   }
  // );

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pagerService: PagerService,
  ) {

  }

  ngOnInit() {

    // this.querySubscription
    //   .add(this.pagenNumberSubscription)
    //   .add(this.pageSizeSubscription)
    //   .add(this.totalItemsSubscription);

    this.loadCurrentPageNumber();
    this.loadCurrentPageSize();
    this.loadCurrentTotalItems();
    // this.pagerService.getPager(1, 16, 100);
    // this.querySubscription = this.route.queryParams.subscribe(
    //   (queryParam: any) => {
    //     if (queryParam.pagenumber !== undefined) {
    //       this.pageNumber = parseInt(queryParam.pagenumber, 10);
    //       this.pagerService.changePageSize(queryParam.pagesize);
    //       // this.pageSize = queryParam.pagesize;
    //     }
    //     console.log('queryParam.pagenumber', queryParam.pagenumber);
    //     console.log('queryParam.pagesize', queryParam.pagesize);
    //   }
    // );


    // this.querySubscription = this.route.queryParams.subscribe(
    //   (queryParam: any) => {
    //     if (queryParam.pagenumber !== undefined) {
    //       this.pageNumber = parseInt(queryParam.pagenumber, 10);
    //       this.pageSize = queryParam.pagesize;
    //     }
    //     console.log('queryParam.pagenumber', queryParam.pagenumber);
    //     console.log('queryParam.pagesize', queryParam.pagesize);
    //   }
    // );
    //
    // this.setPage(this.pageNumber);
    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   // distinctUntilChanged(),
    // ).subscribe(() => {
    //   this.querySubscription
    //     .add(this.pagenNumberSubscription)
    //     .add(this.pageSizeSubscription)
    //     .add(this.totalItemsSubscription);
    //   // this.loadCurrentPageNumber();
    //   // this.loadCurrentPageSize();
    //   // this.loadCurrentTotalItems();
    //
    //   // this.doPageQuery();
    // });
    // this.doPageQuery();

  }


  ngOnDestroy(): void {
    // this.pagenNumberSubscription.unsubscribe();
    // this.pageSizeSubscription.unsubscribe();
    // this.totalItemsSubscription.unsubscribe();
    // this.querySubscription.unsubscribe();
  }



  setPage(currentPage: number) {
    // get pager object from service
    this.pagerService.changePageNumber(currentPage);
    // this.pageNumber = currentPage;
    // this.pager = this.pagerService.getPager(currentPage, this.pageSize, this.totalItems);
    // this.pageNumber = this.pager.currentPage;
    console.log('PAGER!', this.pager);
    console.log('TOTAL ITEMS!', this.totalItems);
    // this.doPageQuery();
    // get current page of cartItems
    // this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log('ITEMS IN PAGE' + this.pagedProducts);
  }

  doPageQuery() {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {pagenumber: this.pager.currentPage, pagesize: this.pager.pageSize},
      queryParamsHandling: 'merge',
      // skipLocationChange: true
      // replaceUrl: true
    });
  }


  check(page) {
    console.log('CHECK PAGE!', page);
    // document.getElementById('page'.concat(page)).className = 'active';
    // console.log('page'.concat(page), 'CLASSNAME', document.getElementById('page'.concat(page)).className);

    console.log('CHECK CURRENT PAGE!', this.pager.currentPage);
    if (this.pager.currentPage === page) {
      return 'active';
    }
  }


  private loadCurrentTotalItems() {
    this.totalItemsSubscription = this.pagerService.currentTotalItems.subscribe(
      totalItems => {
        this.totalItems = totalItems;
        // this.pager = this.pagerService.getPager(this.pageNumber, this.pageSize, totalItems);
        this.pager = this.pagerService.getPager();
        // this.setPage(this.pageNumber);
        // this.doPageQuery();
      }
    );
  }

  private loadCurrentPageSize() {
    this.pageSizeSubscription = this.pagerService.currentPageSize.subscribe(
      pageSize => {
        this.pageSize = pageSize;
        console.log('PAGINATION - SORT PANEL PAGE SIZE', this.pageSize);
        // this.pager = this.pagerService.getPager(this.pageNumber, pageSize, this.totalItems);
        this.pager = this.pagerService.getPager();
        this.doPageQuery();
      }
    );
  }

  private loadCurrentPageNumber() {
    this.pagenNumberSubscription = this.pagerService.currentPageNumber.subscribe(
      pageNumber => {
        this.pageNumber = pageNumber;
        console.log('PAGINATION PAGE NUMBER', this.pageNumber);
        // this.pager = this.pagerService.getPager(pageNumber, this.pageSize, this.totalItems);
        this.pager = this.pagerService.getPager();
        this.doPageQuery();
      }
    );
  }


  // private pagerTotalItems: number;
  // private pagerPageSize: number;
  //
  // totalPages: number;
  // pages: number[] = [];
  // currentPage = 1;
  // isVisible = false;
  // previousEnabled = false;
  // nextEnabled = true;
  //
  // @Input() get pageSize(): number {
  //   return this.pagerPageSize;
  // }
  //
  // set pageSize(pageSize: number) {
  //   this.pagerPageSize = pageSize;
  //   this.update();
  // }
  //
  // @Input() get totalItems(): number {
  //   return this.pagerTotalItems;
  // }
  //
  // set totalItems(itemCount: number) {
  //   this.pagerTotalItems = itemCount;
  //   this.update();
  // }
  //
  // @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  //
  // update() {
  //   if (this.pagerTotalItems && this.pagerPageSize) {
  //     this.totalPages = Math.ceil(this.pagerTotalItems / this.pageSize);
  //     this.isVisible = true;
  //     if (this.totalItems >= this.pageSize) {
  //       for (let i = 1; i < this.totalPages + 1; i++) {
  //         this.pages.push(i);
  //       }
  //     }
  //     return;
  //   }
  //
  //   this.isVisible = false;
  // }
  //
  // previousNext(direction: number, event?: MouseEvent) {
  //   let page: number = this.currentPage;
  //   if (direction === -1) {
  //     if (page > 1) {
  //       page--;
  //     }
  //   } else {
  //     if (page < this.totalPages) {
  //       page++;
  //     }
  //   }
  //   this.changePage(page, event);
  // }
  //
  // changePage(page: number, event?: MouseEvent) {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   if (this.currentPage === page) {
  //     return;
  //   }
  //   this.currentPage = page;
  //   this.previousEnabled = this.currentPage > 1;
  //   this.nextEnabled = this.currentPage < this.totalPages;
  //   this.pageChanged.emit(page);
  // }
  //
  // constructor() {
  // }
  //
  // ngOnInit() {
  // }

}
