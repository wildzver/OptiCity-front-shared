import {
  AfterContentChecked, AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Product} from '../models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {PagerService} from '../services/pager.service';
import {Subscription} from 'rxjs';
import {SortPanelComponent} from '../../sort-panel/sort-panel.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  pager: any = {};
  pageNumber;
  pageSize;

  private _totalItems;

  get totalItems() {
    return this._totalItems;
  }

  @Input()
  set totalItems(value: any) {
    console.log('previous totalItems', this._totalItems);
    console.log('currently selected totalItems', this._totalItems, value);
    this._totalItems = value;

    console.log('PAGENUMBER', this.pageNumber);
    // this.doPageQuery();

    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        if (queryParam.pagenumber !== undefined) {
          this.pageNumber = parseInt(queryParam.pagenumber, 10);
          this.pageSize = queryParam.pagesize;
        }
        console.log('queryParam.pagenumber', queryParam.pagenumber);
        console.log('queryParam.pagesize', queryParam.pagesize);
      }
    );
    // if (this.querySubscription) {
    //   this.setPage(this.pageNumber);
    //   console.log('querySubscription');
    // } else {
    //   this.setPage(1);
    //   console.log('querySubscription-');

    // }
    // if (this.pageNumber === undefined) {
    //   this.pageNumber = 1;
    //
    // }
    this.setPage(this.pageNumber);

    // this.doPageQuery();
  }


  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pagerService: PagerService,
  ) {

  }

  setPage(currentPage: number) {
    // get pager object from service
    // this.pageNumber = currentPage;
    this.pager = this.pagerService.getPager(currentPage, this._totalItems, this.pageSize);
    this.pageNumber = this.pager.currentPage;
    console.log('PAGER!', this.pager);
    console.log('TOTAL ITEMS!', this._totalItems);
    this.doPageQuery();
    // get current page of items
    // this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log('ITEMS IN PAGE' + this.pagedProducts);
  }


  doPageQuery() {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {pagenumber: this.pageNumber, pagesize: this.pageSize},
      queryParamsHandling: 'merge'
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

  ngOnInit() {
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

    this.loadCurrentPageSize();
  }

  private loadCurrentPageSize() {
    this.pagerService.currentPageSize.subscribe(
      pageSize => {
        this.pageSize = pageSize;
        console.log('PAGINATION - SORT PANEL PAGE SIZE', this.pageSize);
        this.setPage(this.pageNumber);
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
