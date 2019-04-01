import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {literalMap} from '@angular/compiler/src/output/output_ast';
// import {DataService} from '../services/data.service';
import {IProduct} from '../shared/models/IProduct';
import {FilterService} from '../services/filter.service';
import {LoggerService} from '../services/logger.service';
import {IPagedResults} from '../shared/models/IPagedResults';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title: string;
  filterText: string;
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  // displayMode: DisplayModeEnum;
  // displayModeEnum = DisplayModeEnum;
  totalRecords = 0;
  pageSize = 10;

  constructor(/*private dataService: DataService,*/
              private filterService: FilterService,
              private logger: LoggerService) {
  }

  ngOnInit() {
    this.title = 'Products';
    this.filterText = 'Filter Products:';
    // this.displayMode = DisplayModeEnum.Card;

    // this.getProductsPage(1);
    // }

    // changeDisplayMode(mode: DisplayModeEnum) {
    //   this.displayMode = mode;
    // }

    // pageChanged(page: number) {
    //   this.getProductsPage(page);
    // }

//   getProductsPage(page: number) {
//     this.dataService.getProductsPage((page - 1) * this.pageSize, this.pageSize)
//       .subscribe((response: IPagedResults<IProduct[]>) => {
//           this.products = this.filteredProducts = response.results;
//           this.totalRecords = response.totalRecords;
//         },
//         (err: any) => this.logger.log(err),
//         () => this.logger.log('getProductsPage() retrieved products for page: ' + page));
//   }
//
//   filterChanged(data: string) {
//     if (data && this.products) {
//       data = data.toUpperCase();
//       const props = ['category', 'lensColor', 'article', 'price'];
//       this.filteredProducts = this.filterService.filter<IProduct>(this.products, data, props);
//     } else {
//       this.filteredProducts = this.products;
//     }
//   }
  }
}



// enum DisplayModeEnum {
//   Card = 0,
//   Grid = 1,
// }

