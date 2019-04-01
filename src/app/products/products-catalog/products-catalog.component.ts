import {Component, Input, OnInit} from '@angular/core';
import {products} from '../../shared/mocks';
import {IProduct} from '../../shared/models/IProduct';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit {

  // veloglasses: IProduct[] = [];

  public products = [
    {
      category: 'veloglasse',
      lensColor: 'чорний',
      lensWidth: 70,
      lensHeight: 40,
      lensMaterial: 'полікарбонат',
      totalWidth: 160,
      bracketLength: 130,
      frameColor: 'чорний',
      frameMaterial: 'ацетат',
      source: '/veloglasses-catalog/2.1.11.jpg',
      article: '00011',
      price: 99,
      routerLink: '0001'
    },
    {
      category: 'veloglasses',
      lensColor: 'чорний',
      lensWidth: 70,
      lensHeight: 40,
      lensMaterial: 'полікарбонат',
      totalWidth: 160,
      bracketLength: 130,
      frameColor: 'чорний',
      frameMaterial: 'ацетат',
      source: '/veloglasses-catalog/2.1.12.jpg',
      article: '00012',
      price: 99,
      routerLink: '0001'
    },
    {
      category: 'veloglasses',
      lensColor: 'чорний',
      lensWidth: 70,
      lensHeight: 40,
      lensMaterial: 'полікарбонат',
      totalWidth: 160,
      bracketLength: 130,
      frameColor: 'чорний',
      frameMaterial: 'ацетат',
      source: '/veloglasses-catalog/2.1.13.jpg',
      article: '00013',
      price: 99,
      routerLink: '0001'
    },
    {
      category: 'veloglasses',
      lensColor: 'чорний',
      lensWidth: 70,
      lensHeight: 40,
      lensMaterial: 'полікарбонат',
      totalWidth: 160,
      bracketLength: 130,
      frameColor: 'чорний',
      frameMaterial: 'ацетат',
      source: '/veloglasses-catalog/2.1.14.jpg',
      article: '00014',
      price: 99,
      routerLink: '0001'
    },
    {
      category: 'veloglasses',
      lensColor: 'чорний',
      lensWidth: 70,
      lensHeight: 40,
      lensMaterial: 'полікарбонат',
      totalWidth: 160,
      bracketLength: 130,
      frameColor: 'чорний',
      frameMaterial: 'ацетат',
      source: '/veloglasses-catalog/2.1.15.jpg',
      article: '00015',
      price: 80,
      routerLink: '0001'
    },
  ];


  getVeloglasses() {
    const getVeloglasses = products.filter(veloglasses => veloglasses.category === 'veloglasses');
    this.products = getVeloglasses;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
