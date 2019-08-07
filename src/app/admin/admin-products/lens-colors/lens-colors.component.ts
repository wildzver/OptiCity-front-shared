import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductsService} from '../../../shared/services/products.service';
import {Color} from '../../../shared/models/color';

@Component({
  selector: 'app-lens-colors',
  templateUrl: './lens-colors.component.html',
  styleUrls: ['./lens-colors.component.scss']
})
export class LensColorsComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedLensColor: Color;
  lensColors: Color[];
  isNewRecord: boolean;
  statusMessage: string;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.keyCode;
    if (keyPressed === 27) {
      this.cancel();
    }
    if (keyPressed === 13) {
      this.saveLensColor();
    }
  }

  constructor(private productService: ProductsService) {
    this.lensColors = new Array<Color>();
  }

  ngOnInit() {
    this.loadLensColors();
  }

  private loadLensColors() {
    this.productService.getLensColors().subscribe((data: Color[]) => {
      this.lensColors = data;
      console.log(this.lensColors);
    });
  }

  addLensColor() {
    this.editedLensColor = new Color(null, '', '');
    this.lensColors.push(this.editedLensColor);
    this.isNewRecord = true;
  }

  editLensColor(lensColor: Color) {
    console.log(lensColor);
    this.editedLensColor = new Color(lensColor.id, lensColor.name, lensColor.uaName);
    console.log(lensColor.id);
  }

  loadTemplate(lensColor: Color) {
    if (this.editedLensColor && this.editedLensColor.id === lensColor.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveLensColor() {
    if (this.isNewRecord) {
      this.productService.createLensColor(this.editedLensColor).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadLensColors();
      });
      console.log(this.editedLensColor);
      this.isNewRecord = false;
      this.editedLensColor = null;
    } else {
      this.productService.updateLensColor(this.editedLensColor).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadLensColors();
      });
      this.editedLensColor = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.lensColors.pop();
      this.isNewRecord = false;
    }
    this.editedLensColor = null;
  }

  deleteLensColor(lensColor: Color) {
    this.productService.deleteLensColor(lensColor).subscribe(data => {
      this.statusMessage = 'Data deleted successfully',
        this.loadLensColors();
    });
  }
}
