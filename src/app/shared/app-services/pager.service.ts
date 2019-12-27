import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PagerService {

  category = 'veloglasses';

  private pageNumberSource = new BehaviorSubject(1);
  currentPageNumber = this.pageNumberSource.asObservable();

  private pageSizeSource = new BehaviorSubject(24);
  currentPageSize = this.pageSizeSource.asObservable();

  private sortBySource = new BehaviorSubject('productNumber');
  currentSortBy = this.sortBySource.asObservable();

  private sortDirectionSource = new BehaviorSubject('ASC');
  currentSortDirection = this.sortDirectionSource.asObservable();

  private totalItemsSource = new BehaviorSubject(0);
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
      queryParamMap.has('pagesize') ? parseInt(queryParamMap.get('pagesize'), 10) : 24
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
  }

  changePageSize(pageSize: number) {
    this.pageSizeSource.next(pageSize);
  }

  changeSortBy(sortBy: string) {
    this.sortBySource.next(sortBy);
  }

  changeSortDirection(sortDirection: string) {
    this.sortDirectionSource.next(sortDirection);
  }

  changeTotalItems(totalItems: number) {
    this.totalItemsSource.next(totalItems);
  }

  getPager(pagesIncome?, currentPage?, pageSize?, totalItems?) {
    currentPage = currentPage ? currentPage : this.pageNumberSource.getValue();

    if (this.totalItemsSource.getValue() > 0) {
      totalItems = totalItems ? totalItems : this.totalItemsSource.getValue();
    }
    pageSize = pageSize ? pageSize : this.pageSizeSource.getValue();
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
      this.changePageNumber(currentPage);

    } else if (currentPage > totalPages) {
      currentPage = totalPages;
      this.changePageNumber(currentPage);
    }

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
