import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-veloglasses',
  templateUrl: './veloglasses.component.html',
  styleUrls: ['./veloglasses.component.scss']
})
export class VeloglassesComponent implements OnInit {
@Input() categoryInput;


  constructor() {
  }

  ngOnInit() {
  }
}
