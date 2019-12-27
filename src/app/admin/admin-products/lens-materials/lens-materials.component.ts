import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductsService} from '../../../shared/app-services/products.service';
import {Material} from '../../../shared/models/material';

@Component({
  selector: 'app-lens-materials',
  templateUrl: './lens-materials.component.html',
  styleUrls: ['./lens-materials.component.scss']
})
export class LensMaterialsComponent  implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedLensMaterial: Material;
  lensMaterials: Material[];
  isNewRecord: boolean;
  statusMessage: string;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.keyCode;
    if (keyPressed === 27) {
      this.cancel();
    }
    if (keyPressed === 13) {
      this.saveLensMaterial();
    }
  }

  constructor(private productService: ProductsService) {
    this.lensMaterials = new Array<Material>();
  }

  ngOnInit() {
    this.loadLensMaterials();
  }

  private loadLensMaterials() {
    this.productService.getLensMaterials().subscribe((lensMaterials: Material[]) => {
      this.lensMaterials = lensMaterials;
    });
  }

  addLensMaterial() {
    this.editedLensMaterial = new Material(null, '', '');
    this.lensMaterials.push(this.editedLensMaterial);
    this.isNewRecord = true;
  }

  editLensMaterial(lensMaterial: Material) {
    this.editedLensMaterial = new Material(lensMaterial.id, lensMaterial.name, lensMaterial.uaName);
  }

  loadTemplate(lensMaterial: Material) {
    if (this.editedLensMaterial && this.editedLensMaterial.id === lensMaterial.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveLensMaterial() {
    if (this.isNewRecord) {
      this.productService.createLensMaterial(this.editedLensMaterial).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadLensMaterials();
      });
      this.isNewRecord = false;
      this.editedLensMaterial = null;
    } else {
      this.productService.updateLensMaterial(this.editedLensMaterial).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadLensMaterials();
      });
      this.editedLensMaterial = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.lensMaterials.pop();
      this.isNewRecord = false;
    }
    this.editedLensMaterial = null;
  }

  deleteLensMaterial(lensMaterial: Material) {
    this.productService.deleteLensMaterial(lensMaterial).subscribe(data => {
      this.statusMessage = 'Data deleted successfully',
        this.loadLensMaterials();
    });
  }
}
