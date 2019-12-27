import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Category} from '../../../shared/models/category';
import {ProductsService} from '../../../shared/app-services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedCategory: Category;
  categories: Category[];
  isNewRecord: boolean;
  statusMessage: string;

  selectedFiles: FileList;
  currentFileUpload: File;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.keyCode;
    if (keyPressed === 27) {
      this.cancel();
    }
    if (keyPressed === 13) {
      this.saveCategory();
    }
  }

  constructor(private productsService: ProductsService) {
    this.categories = new Array<Category>();
  }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.productsService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  addCategory() {
    this.editedCategory = new Category(null, '', '');
    this.categories.push(this.editedCategory);
    this.isNewRecord = true;
  }

  editCategory(category: Category) {
    this.editedCategory = new Category(category.id, category.name, category.uaName);
  }

  loadTemplate(category: Category) {
    if (this.editedCategory && this.editedCategory.id === category.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveCategory() {
    if (this.selectedFiles) {
      this.currentFileUpload = this.selectedFiles.item(0);
    }
    const json = JSON.stringify(this.editedCategory);
    const blob = new Blob([json], {type: 'application/json'});
    const formData = new FormData();
    formData.append('category', blob);
    formData.append('categoryImage', this.currentFileUpload);

    if (this.isNewRecord) {
      this.productsService.createCategory(formData).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadCategories();
      });
      this.isNewRecord = false;
      this.editedCategory = null;
    } else {
      this.productsService.updateCategory(formData, this.editedCategory).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadCategories();
      });
      this.editedCategory = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.categories.pop();
      this.isNewRecord = false;
    }
    this.editedCategory = null;
  }

  deleteCategory(category: Category) {
    this.productsService.deleteCategory(category).subscribe(data => {
      this.statusMessage = 'Data deleted successfully',
        this.loadCategories();
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
