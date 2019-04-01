import {Component, Input, OnInit} from '@angular/core';
import {products} from '../../shared/mocks';
import {IProduct} from '../../shared/models/IProduct';

@Component({
  selector: 'app-veloglasses',
  templateUrl: './veloglasses.component.html',
  styleUrls: ['./veloglasses.component.scss']
})
export class VeloglassesComponent implements OnInit {
// @Input() products;



  constructor() {
  }

  ngOnInit() {  }
}
