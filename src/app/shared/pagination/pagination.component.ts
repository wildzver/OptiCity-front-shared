import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PagerService} from '../app-services/pager.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  pager: any = {};
  pageNumber;
  pageSize;
  @Input()
  totalItems: number;
  pagenNumberSubscription: Subscription;
  pageSizeSubscription: Subscription;
  totalItemsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pagerService: PagerService,
  ) {
  }

  ngOnInit() {
    this.loadCurrentPageNumber();
    this.loadCurrentPageSize();
    this.loadCurrentTotalItems();
  }

  setPage(currentPage: number) {
    // get pager object from service
    this.pagerService.changePageNumber(currentPage);
    console.log('PAGER!', this.pager);
    console.log('TOTAL ITEMS!', this.totalItems);
  }

  doPageQuery() {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {pagenumber: this.pager.currentPage, pagesize: this.pager.pageSize},
      queryParamsHandling: 'merge',
    });
  }

  private loadCurrentTotalItems() {
    this.totalItemsSubscription = this.pagerService.currentTotalItems.subscribe(
      totalItems => {
        this.totalItems = totalItems;
        this.pager = this.pagerService.getPager();
      });
  }

  private loadCurrentPageSize() {
    this.pageSizeSubscription = this.pagerService.currentPageSize.subscribe(
      pageSize => {
        this.pageSize = pageSize;
        this.pager = this.pagerService.getPager();
        this.doPageQuery();
      });
  }

  private loadCurrentPageNumber() {
    this.pagenNumberSubscription = this.pagerService.currentPageNumber.subscribe(
      pageNumber => {
        this.pageNumber = pageNumber;
        this.pager = this.pagerService.getPager();
        this.doPageQuery();
      });
  }
}
