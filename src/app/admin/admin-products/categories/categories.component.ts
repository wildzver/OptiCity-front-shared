import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Category} from '../../../shared/models/category';
import {Router} from '@angular/router';
import {ProductsService} from '../../../shared/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  // categories = [
  //   {id: 1, name: 'veloglasses', uaName: 'Велоокуляри'},
  //   {id: 2, name: 'skiglasses', uaName: 'Лижні окуляри'},
  //   {id: 3, name: 'frames', uaName: 'Оправи'},
  //   {id: 4, name: 'accesories', uaName: 'Аксесуари'}
  // ];
  categories: Category[];

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private productService: ProductsService) {}

  ngOnInit() {
    const categoryArray = this.fb.array([]);
    this.categoryForm = this.fb.group({
      categories: categoryArray
    });

    this.productService.getCategories().subscribe(data => {
      this.categories = data;
      this.categories.forEach(category => {
        categoryArray.push(this.createCategoryGroup(category));
        console.log(category);
      });
    });

    // this.categoryForm = this.fb.group({
    //   categories: this.fb.array(this.categories.map(category => {this.createCategoryGroup(category), console.log(category); } ))
    // });

  }

  createCategoryGroup(category: any = {}) {
    return this.fb.group({
      id: this.fb.control(category.id),
      name: this.fb.control(category.name),
      uaName: this.fb.control(category.uaName)
    });
  }

  addCategory() {
    this.categoriesArray.push(this.createCategoryGroup());
  }

  onSubmit(i) {
    const category: Category = {
      id: this.categoriesArray.at(i).value.id,
      name: this.categoriesArray.at(i).value.name,
      uaName: this.categoriesArray.at(i).value.uaName
    };
    // this.productService.createCategory(this.categoriesArray.at(i));
    this.productService.updateCategory(category).subscribe(value => console.log(value));
    console.log(category);
    // console.log(this.categoriesArray.at(i).value.name);
  }

  removeCategory(index) {
    this.categoriesArray.removeAt(index);
    // this.productService.deleteCategory(category)
  }

  get categoriesArray() {
    return (this.categoryForm.get('categories') as FormArray);
  }

}
