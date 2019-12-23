import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Material} from '../../../shared/models/material';
import {ProductsService} from '../../../shared/app-services/products.service';
import {Origin} from '../../../shared/models/origin';

@Component({
  selector: 'app-origins',
  templateUrl: './origins.component.html',
  styleUrls: ['./origins.component.scss']
})
export class OriginsComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedOrigin: Origin;
  origins: Origin[];
  isNewRecord: boolean;
  statusMessage: string;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.keyCode;
    if (keyPressed === 27) {
      this.cancel();
    }
    if (keyPressed === 13) {
      this.saveOrigin();
    }
  }

  constructor(private productService: ProductsService) {
    this.origins = new Array<Origin>();
  }

  ngOnInit() {
    this.loadOrigins();
  }

  private loadOrigins() {
    this.productService.getOrigins().subscribe((origins: Origin[]) => {
      this.origins = origins;
      console.log(this.origins);
    });
  }

  addOrigin() {
    this.editedOrigin = new Origin(null, '', '');
    this.origins.push(this.editedOrigin);
    this.isNewRecord = true;
  }

  editOrigin(origin: Origin) {
    console.log(origin);
    this.editedOrigin = new Origin(origin.id, origin.name, origin.uaName);
    console.log(origin.id);
  }

  loadTemplate(origin: Origin) {
    if (this.editedOrigin && this.editedOrigin.id === origin.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveOrigin() {
    if (this.isNewRecord) {
      this.productService.createOrigin(this.editedOrigin).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadOrigins();
      });
      console.log(this.editedOrigin);
      this.isNewRecord = false;
      this.editedOrigin = null;
    } else {
      this.productService.updateOrigin(this.editedOrigin).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadOrigins();
      });
      this.editedOrigin = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.origins.pop();
      this.isNewRecord = false;
    }
    this.editedOrigin = null;
  }

  deleteOrigin(origin: Origin) {
    this.productService.deleteOrigin(origin).subscribe(data => {
      this.statusMessage = 'Data deleted successfully',
        this.loadOrigins();
    });
  }
}
