import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Category} from '../../../shared/models/category';
import {Router} from '@angular/router';
import {ProductsService} from '../../../shared/services/products.service';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

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
    // console.log(event);
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
      console.log(this.categories);
    });
  }

  addCategory() {
    this.editedCategory = new Category(null, '', '');
    this.categories.push(this.editedCategory);
    this.isNewRecord = true;
  }

  editCategory(category: Category) {
    console.log(category);
    this.editedCategory = new Category(category.id, category.name, category.uaName);
    console.log(category.id);
  }

  loadTemplate(category: Category) {
    // console.log(this.editedCategory.id);
    // console.log(this.editedCategory.id);
    if (this.editedCategory && this.editedCategory.id === category.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveCategory() {
    if (this.isNewRecord) {
      this.currentFileUpload = this.selectedFiles.item(0);
      const json = JSON.stringify(this.editedCategory);
      const blob = new Blob([json], {type: 'application/json'});
      const formData = new FormData();
      formData.append('category', blob);
      formData.append('categoryImage', this.currentFileUpload);

      this.productsService.createCategory(formData).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadCategories();
      });
      console.log(this.editedCategory);
      this.isNewRecord = false;
      this.editedCategory = null;
    } else {
      this.productsService.updateCategory(this.editedCategory).subscribe(data => {
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
