import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {ActivatedRoute, NavigationEnd, ParamMap, Router, RouterEvent} from '@angular/router';
import {SortDirection} from '../models/sortDirection';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import * as Rx from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PagerService {

  category = 'veloglasses';

  private pageNumberSource = new BehaviorSubject(1);
  currentPageNumber = this.pageNumberSource.asObservable();

  private pageSizeSource = new BehaviorSubject(16);
  currentPageSize = this.pageSizeSource.asObservable();

  private sortBySource = new BehaviorSubject('productNumber');
  currentSortBy = this.sortBySource.asObservable();

  private sortDirectionSource = new BehaviorSubject('ASC');
  currentSortDirection = this.sortDirectionSource.asObservable();

  private totalItemsSource = new BehaviorSubject(1000000);
  currentTotalItems = this.totalItemsSource.asObservable();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const queryParamMap: ParamMap = activatedRoute.snapshot.queryParamMap;
    this.pageNumberSource.next(
      queryParamMap.has('pagenumber') ? parseInt(queryParamMap.get('pagenumber'), 10) : 1
    );

    this.pageSizeSource.next(
      queryParamMap.has('pagesize') ? parseInt(queryParamMap.get('pagesize'), 10) : 16
    );

    this.sortBySource.next(
      queryParamMap.has('sb') ? queryParamMap.get('sb') : 'productNumber'
    );

    this.sortDirectionSource.next(
      queryParamMap.has('sd') ? queryParamMap.get('sd') : 'ASC'
    );


  }

  changePageNumber(pageNumber: number) {
    this.pageNumberSource.next(pageNumber);
    console.log('MY NEW PAGE NUMBER IN CHANGE PAGE NUMBER', pageNumber);
  }

  changePageSize(pageSize: number) {
    this.pageSizeSource.next(pageSize);
    // this.doPageQuery()

    console.log('MY NEW PAGE SIZE IN CHANGE PAGE SIZE', pageSize);
  }

  changeSortBy(sortBy: string) {
    this.sortBySource.next(sortBy);
    console.log('MY NEW SORT BY IN CHANGE PAGE NUMBER', sortBy);
    // this.doSortQuery();
  }

  changeSortDirection(sortDirection: string) {
    this.sortDirectionSource.next(sortDirection);
    console.log('MY NEW SORT DIRECTION IN CHANGE PAGE NUMBER', sortDirection);
  }

  private doSortQuery() {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sb: this.sortBySource.getValue(),
        sd: this.sortDirectionSource.getValue()
      },
      queryParamsHandling: 'merge'
    });
  }


  changeTotalItems(totalItems: number) {
    this.totalItemsSource.next(totalItems);
    console.log('MY NEW TOTAL ITEMS IN CHANGE PAGE NUMBER', totalItems);
  }

  // getPager(currentPage: number = 1, totalItems: number, pageSize: number) {
  getPager(pagesIncome?, currentPage?, pageSize?, totalItems?) {
    // getPager(currentPage = this.pageNumberSource.getValue()) {
    currentPage = currentPage ? currentPage : this.pageNumberSource.getValue();

    if (this.totalItemsSource.getValue() > 0) {
      totalItems = totalItems ? totalItems : this.totalItemsSource.getValue();
    }
    pageSize = pageSize ? pageSize : this.pageSizeSource.getValue();
    // let currentPage = this.pageNumberSource.getValue();
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    console.log('--->TOTAL PAGES', totalItems, pageSize, totalPages);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      console.log('MY CURRENT PAGE FOR CHECK', currentPage);
      currentPage = 1;
      this.changePageNumber(currentPage);

    } else if (currentPage > totalPages) {
      currentPage = totalPages;
      this.changePageNumber(currentPage);

    }
    // this.changePageNumber(currentPage);


    let startPage: number;
    let endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = pagesIncome === 0 ? null : Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }
}
