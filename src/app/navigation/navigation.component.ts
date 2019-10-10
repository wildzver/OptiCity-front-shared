import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Category} from '../shared/models/category';
import {ProductsService} from '../shared/services/products.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  category: Category = {id: 0, uaName: '', name: '', imageName: ''};
  url = '';
  links: Array<{ itemName: string, path: string, url: string }> = [
  ];
  translation: Array<{ uaText: string, enText: string }> = [
    {uaText: 'Каталог', enText: 'products'}
  ];

  private routeSubscription: Subscription;
  private routeParamSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService) {
  }

  ngOnInit() {

    this.route.params.subscribe((data: Params) => {
      console.log('MY ROUTE PARAMS DATA', data);
      if (Object.keys(data).includes('category')) {
        //   this.isParamCategory = true;
        this.category.name = data.category;
        //   this.getCategoryUaName();
        console.log('MY CATEGORY', this.category);
        // }
        // else {
        //   this.isParamCategory = false;
      }
    });

    this.routeSubscription = this.route.url.subscribe(data => {
      this.links = [];
      this.url = '';
      console.log('my asasa', data);
      for (const dataItem of data) {

      }
      data.forEach(
        url => {
        this.url = this.url.concat('/', url.path);

        if (url.path === this.category.name) {
          this.productsService.getCategoryByName(this.category.name).subscribe(data2 => {
            console.log('MY URL PATH', url.path);
            console.log('MY URL PATH MY CATEGORY NAME', this.category.name);
            console.log('MY URL PATH  = MY CATEGORY NAME? ', url.path === this.category.name);
            console.log('MY LINKS ', this.links);

            this.links.push({
              // itemName: url.path.toString() === this.category.name.toString() ? data2.uaName : this.getItemName(url.path),
              itemName: data2.uaName,
              path: url.path,
              url: this.url
            });
          });
        } else if (this.translation.some(item => item.enText === url.path)) {
          this.links.push({
            itemName: this.translation.filter(value => {
              return value.enText === url.path;
            }).map(value => value.uaText)[0],
            path: url.path,
            url: this.url
          });
        } else {
          this.links.push({
            itemName: url.path,
            path: url.path,
            url: this.url
          });
        }
      });
    });


  }

  private getItemName(path) {
    if (this.translation.some(item => item.enText === path)) {
      return this.translation.filter(value => {
        return value.enText === path;
      }).map(value => value.uaText)[0];
    } else {
      return path;
    }
  }

  getCategoryUaName() {
    const parameter = {
      categoryName: this.category.name
    };
    this.productsService.getCategoryByName(parameter).subscribe(data => {
      this.category.uaName = data.uaName;
      console.log('DATA ITEM NAME', data.uaName);

    });
  }


}
