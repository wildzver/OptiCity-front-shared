import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent implements OnInit {
  @Input() checked: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
