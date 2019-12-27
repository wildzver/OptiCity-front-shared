import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Sort} from '../shared/models/sort';
import {SortDirection} from '../shared/models/sortDirection';
import {Subscription} from 'rxjs';
import {PagerService} from '../shared/app-services/pager.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sort-panel',
  templateUrl: './sort-panel.component.html',
  styleUrls: ['./sort-panel.component.scss']
})

export class SortPanelComponent implements OnInit, OnDestroy {

  sortBy = 'productNumber';
  sortDirection = 'ASC';

  pageSizeOptions: number[] = [24, 48, 96];

  pageSize = this.pageSizeOptions[0];
  sortPanelForm: FormGroup;

  sortOptions: Sort[] = [
    {label: 'назва '.concat(String.fromCharCode(8593)), value: 'productNumber', direction: SortDirection.ASC},
    {label: 'назва '.concat(String.fromCharCode(8595)), value: 'productNumber', direction: SortDirection.DESC},
    {label: 'ціна '.concat(String.fromCharCode(8593)), value: 'price', direction: SortDirection.ASC},
    {label: 'ціна '.concat(String.fromCharCode(8595)), value: 'price', direction: SortDirection.DESC},
  ];

  sortOptionsLabels: string[] = [];

  querySubscription = new Subscription();
  pageSizeSubscription = this.pagerService.currentPageSize.subscribe(
    pageSize => this.pageSize = pageSize);
  sortBySubscription = this.pagerService.currentSortBy.subscribe(
    sortBy => this.sortBy = sortBy);
  sortDirectionSubscription = this.pagerService.currentSortDirection.subscribe(
    sortDirection => this.sortDirection = sortDirection);

  constructor(private fb: FormBuilder,
              private pagerService: PagerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.querySubscription
      .add(this.pageSizeSubscription)
      .add(this.sortBySubscription)
      .add(this.sortDirectionSubscription);
    this.initSortOptionsLabels();
    this.initSortPanelGroup();
    this.setSortBy();
    this.setPageSize();
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  private setCurrentSort() {
    const currentSortOption = this.sortOptions
      .find(sortoption => {
          return sortoption.value === this.sortBy && SortDirection[sortoption.direction] === this.sortDirection;
        }
      );
    return currentSortOption ? currentSortOption.label : this.sortOptionsLabels[0];
  }

  private initSortOptionsLabels() {
    this.sortOptionsLabels = this.sortOptions.map(value => value.label);
  }

  private initSortPanelGroup() {
    this.sortPanelForm = this.fb.group({
      sortBy: new FormControl(this.setCurrentSort(), Validators.required),
      pageSize: new FormControl(this.pageSize, Validators.required)
    });
  }

  private setSortBy() {
    this.sortPanelForm.controls.sortBy.valueChanges.subscribe(value => {
      const sortOption = this.sortOptions.find(element => element.label === value);
      this.sortBy = sortOption.value;
      this.pagerService.changeSortBy(sortOption.value);
      this.sortDirection = SortDirection[sortOption.direction];
      this.pagerService.changeSortDirection(SortDirection[sortOption.direction]);
      this.doSortQuery();
    });
  }

  private setPageSize() {
    this.sortPanelForm.controls.pageSize.valueChanges.subscribe(value => {
      this.pageSize = value;
      this.pagerService.changePageSize(value);
    });
  }

  private doSortQuery() {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sb: this.sortBy,
        sd: this.sortDirection
      },
      queryParamsHandling: 'merge'
    });
  }
}
