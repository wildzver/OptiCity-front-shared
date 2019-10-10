import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Sort} from '../shared/models/sort';
import {SortDirection} from '../shared/models/sortDirection';
import {ProductsService} from '../shared/services/products.service';
import {BehaviorSubject} from 'rxjs';
import {PagerService} from '../shared/services/pager.service';
import {ActivatedRoute} from '@angular/router';
import {query} from '@angular/animations';


@Component({
  selector: 'app-sort-panel',
  templateUrl: './sort-panel.component.html',
  styleUrls: ['./sort-panel.component.scss']
})

export class SortPanelComponent implements OnInit {

  sortBy = 'price';
  private sortBySource = new BehaviorSubject(this.sortBy);
  currentSortBy = this.sortBySource.asObservable();
  sortDirection = 'ASC';

  pageSizeOptions: number[] = [16, 24, 32];

  pageSize = this.pageSizeOptions[0];
  sortPanelForm: FormGroup;
  // categories = Category[''];

  sortOptions: Sort[] = [
    {label: 'від дешевих до дорогих', value: 'price', direction: SortDirection.ASC},
    {label: 'від дорогих до дешевих', value: 'price', direction: SortDirection.DESC},
    {label: 'А-яA-z', value: 'productNumber', direction: SortDirection.ASC},
    {label: 'Я-аZ-a', value: 'productNumber', direction: SortDirection.DESC},
  ];

  sortOptionsLabels: string[] = [];


  constructor(private fb: FormBuilder,
              private pagerService: PagerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadCurrentPageSize();
    this.initSortOptionsLabels();
    this.initSortPanelGroup();
    this.setSortByAndPageSize();
  }

  // private loadCategories() {
  //   this.pS.getCategories().subscribe((data: Category[]) => {
  //     this.categories = data;
  //     console.log('CAtegories', this.categories);
  //   });
  // }

  private setCurrentPageSize() {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    if (queryParams.has('pagesize')) {
      this.pageSize = parseInt(queryParams.get('pagesize'), 10);
    }
    this.pagerService.changePageSize(this.pageSize);
    return this.pageSize;
  }

  private loadCurrentPageSize() {
    this.pagerService.currentPageSize.subscribe(
      pageSize => {
        this.pageSize = pageSize;
        console.log('PAGINATION - SORT PANEL PAGE SIZE', this.pageSize);
      }
    );
  }

  private initSortOptionsLabels() {
    this.sortOptionsLabels = this.sortOptions.map(value => value.label);
  }

  private initSortPanelGroup() {
    this.sortPanelForm = this.fb.group({
      sortBy: new FormControl('від дешевих до дорогих', Validators.required),
      pageSize: new FormControl(this.setCurrentPageSize(), Validators.required)
    });
  }

  checker(controlName: string): string {
    if (this.sortPanelForm.controls[controlName].valid) {
      return 'is-valid';
    }
    if (this.sortPanelForm.controls[controlName].touched && this.sortPanelForm.controls[controlName].invalid) {
      return 'is-invalid';
    } else {
      return 'is-default';
    }
  }

  setSortByAndPageSize() {
    this.sortPanelForm.valueChanges.subscribe(value => {
        console.log('MY VALUE ON CHANGE', value);
        const sortOption = this.sortOptions.find(value1 => value1.label === value.sortBy);
        console.log('SORT OPTION', sortOption);
        this.sortBy = sortOption.value;
        console.log('MY SORTBY ON CHANGE', this.sortBy);
        this.sortDirection = SortDirection[sortOption.direction];
        console.log('MY SORTDIRECTION ON CHANGE', this.sortDirection);
        this.pageSize = value.pageSize;
        console.log('MY SORT PANEL PAGE SIZE ON CHANGE', this.pageSize);
        this.pagerService.changePageSize(value.pageSize);
      }
    );
  }

}
