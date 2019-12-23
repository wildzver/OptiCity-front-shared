import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductsService} from '../../../shared/app-services/products.service';
import {Sex} from '../../../shared/models/sex';

@Component({
  selector: 'app-sex',
  templateUrl: './sex.component.html',
  styleUrls: ['./sex.component.scss']
})
export class SexComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedSex: Sex;
  sexes: Sex[];
  isNewRecord: boolean;
  statusMessage: string;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.keyCode;
    if (keyPressed === 27) {
      this.cancel();
    }
    if (keyPressed === 13) {
      this.saveSex();
    }
  }

  constructor(private productService: ProductsService) {
    this.sexes = new Array<Sex>();
  }

  ngOnInit() {
    this.loadSex();
  }

  private loadSex() {
    this.productService.getSexes().subscribe((sexes: Sex[]) => {
      this.sexes = sexes;
      console.log(this.sexes);
    });
  }

  addSex() {
    this.editedSex = new Sex(null, '', '');
    this.sexes.push(this.editedSex);
    this.isNewRecord = true;
  }

  editSex(sex: Sex) {
    console.log(sex);
    this.editedSex = new Sex(sex.id, sex.name, sex.uaName);
    console.log(sex.id);
  }

  loadTemplate(sex: Sex) {
    if (this.editedSex && this.editedSex.id === sex.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveSex() {
    if (this.isNewRecord) {
      this.productService.createSex(this.editedSex).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadSex();
      });
      console.log(this.editedSex);
      this.isNewRecord = false;
      this.editedSex = null;
    } else {
      this.productService.updateSex(this.editedSex).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadSex();
      });
      this.editedSex = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.sexes.pop();
      this.isNewRecord = false;
    }
    this.editedSex = null;
  }

  deleteSex(sex: Sex) {
    this.productService.deleteSex(sex).subscribe(data => {
      this.statusMessage = 'Data deleted successfully',
        this.loadSex();
    });
  }
}
