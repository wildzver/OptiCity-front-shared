import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Material} from '../../../shared/models/material';
import {ProductsService} from '../../../shared/app-services/products.service';
import {Diopter} from '../../../shared/models/diopter';

@Component({
  selector: 'app-diopters',
  templateUrl: './diopters.component.html',
  styleUrls: ['./diopters.component.scss']
})
export class DioptersComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedDiopter: Diopter;
  diopters: Diopter[];
  isNewRecord: boolean;
  statusMessage: string;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.keyCode;
    if (keyPressed === 27) {
      this.cancel();
    }
    if (keyPressed === 13) {
      this.saveDiopter();
    }
  }

  constructor(private productService: ProductsService) {
    this.diopters = new Array<Material>();
  }

  ngOnInit() {
    this.loadDiopters();
  }

  private loadDiopters() {
    this.productService.getDiopters().subscribe((diopters: Diopter[]) => {
      this.diopters = diopters;
      console.log(this.diopters);
    });
  }

  addDiopter() {
    this.editedDiopter = new Material(null, null);
    this.diopters.push(this.editedDiopter);
    this.isNewRecord = true;
  }

  editDiopter(diopter: Diopter) {
    console.log(diopter);
    this.editedDiopter = new Diopter(diopter.id, diopter.value);
    console.log(diopter.id);
  }

  loadTemplate(diopter: Diopter) {
    if (this.editedDiopter && this.editedDiopter.id === diopter.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveDiopter() {
    if (this.isNewRecord) {
      this.productService.createDiopter(this.editedDiopter).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadDiopters();
      });
      console.log(this.editedDiopter);
      this.isNewRecord = false;
      this.editedDiopter = null;
    } else {
      this.productService.updateDiopter(this.editedDiopter).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadDiopters();
      });
      this.editedDiopter = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.diopters.pop();
      this.isNewRecord = false;
    }
    this.editedDiopter = null;
  }

  deleteDiopter(diopter: Diopter) {
    this.productService.deleteDiopter(diopter).subscribe(data => {
      this.statusMessage = 'Data deleted successfully',
        this.loadDiopters();
    });
  }
}
