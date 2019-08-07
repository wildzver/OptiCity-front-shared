import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductsService} from '../../../shared/services/products.service';
import {Color} from '../../../shared/models/color';

@Component({
  selector: 'app-frame-colors',
  templateUrl: './frame-colors.component.html',
  styleUrls: ['./frame-colors.component.scss']
})
export class FrameColorsComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedFrameColor: Color;
  frameColors: Color[];
  isNewRecord: boolean;
  statusMessage: string;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.keyCode;
    if (keyPressed === 27) {
      this.cancel();
    }
    if (keyPressed === 13) {
      this.saveFrameColor();
    }
  }

  constructor(private productService: ProductsService) {
    this.frameColors = new Array<Color>();
  }

  ngOnInit() {
    this.loadFrameColors();
  }

  private loadFrameColors() {
    this.productService.getFrameColors().subscribe((data: Color[]) => {
      this.frameColors = data;
      console.log(this.frameColors);
    });
  }

  addFrameColor() {
    this.editedFrameColor = new Color(null, '', '');
    this.frameColors.push(this.editedFrameColor);
    this.isNewRecord = true;
  }

  editFrameColor(frameColor: Color) {
    console.log(frameColor);
    this.editedFrameColor = new Color(frameColor.id, frameColor.name, frameColor.uaName);
    console.log(frameColor.id);
  }

  loadTemplate(frameColor: Color) {
    if (this.editedFrameColor && this.editedFrameColor.id === frameColor.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveFrameColor() {
    if (this.isNewRecord) {
      this.productService.createFrameColor(this.editedFrameColor).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadFrameColors();
      });
      console.log(this.editedFrameColor);
      this.isNewRecord = false;
      this.editedFrameColor = null;
    } else {
      this.productService.updateFrameColor(this.editedFrameColor).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadFrameColors();
      });
      this.editedFrameColor = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.frameColors.pop();
      this.isNewRecord = false;
    }
    this.editedFrameColor = null;
  }

  deleteFrameColor(frameColor: Color) {
    this.productService.deleteFrameColor(frameColor).subscribe(data => {
      this.statusMessage = 'Data deleted successfully',
        this.loadFrameColors();
    });
  }
}
