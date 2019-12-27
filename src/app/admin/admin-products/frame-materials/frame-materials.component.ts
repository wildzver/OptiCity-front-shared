import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Material} from '../../../shared/models/material';
import {ProductsService} from '../../../shared/app-services/products.service';

@Component({
  selector: 'app-frame-materials',
  templateUrl: './frame-materials.component.html',
  styleUrls: ['./frame-materials.component.scss']
})
export class FrameMaterialsComponent implements OnInit {


  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedFrameMaterial: Material;
  frameMaterials: Material[];
  isNewRecord: boolean;
  statusMessage: string;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.keyCode;
    if (keyPressed === 27) {
      this.cancel();
    }
    if (keyPressed === 13) {
      this.saveFrameMaterial();
    }
  }

  constructor(private productService: ProductsService) {
    this.frameMaterials = new Array<Material>();
  }

  ngOnInit() {
    this.loadFrameMaterials();
  }

  private loadFrameMaterials() {
    this.productService.getFrameMaterials().subscribe((frameMaterials: Material[]) => {
      this.frameMaterials = frameMaterials;
    });
  }

  addFrameMaterial() {
    this.editedFrameMaterial = new Material(null, '', '');
    this.frameMaterials.push(this.editedFrameMaterial);
    this.isNewRecord = true;
  }

  editFrameMaterial(frameMaterial: Material) {
    this.editedFrameMaterial = new Material(frameMaterial.id, frameMaterial.name, frameMaterial.uaName);
  }

  loadTemplate(frameMaterial: Material) {
    if (this.editedFrameMaterial && this.editedFrameMaterial.id === frameMaterial.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveFrameMaterial() {
    if (this.isNewRecord) {
      this.productService.createFrameMaterial(this.editedFrameMaterial).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadFrameMaterials();
      });
      this.isNewRecord = false;
      this.editedFrameMaterial = null;
    } else {
      this.productService.updateFrameMaterial(this.editedFrameMaterial).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadFrameMaterials();
      });
      this.editedFrameMaterial = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.frameMaterials.pop();
      this.isNewRecord = false;
    }
    this.editedFrameMaterial = null;
  }

  deleteFrameMaterial(frameMaterial: Material) {
    this.productService.deleteFrameMaterial(frameMaterial).subscribe(data => {
      this.statusMessage = 'Data deleted successfully',
        this.loadFrameMaterials();
    });
  }
}
