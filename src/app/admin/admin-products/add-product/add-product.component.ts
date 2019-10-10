import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../shared/models/product';
import {ProductsService} from '../../../shared/services/products.service';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {Category} from '../../../shared/models/category';
import {Color} from '../../../shared/models/color';
import {UploadFileService} from '../../../shared/services/upload-file.service';
import {fileSize} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private uploadService: UploadFileService
  ) {
  }

  addProductForm: FormGroup;
  categories = Category[''];
  lensMaterials = ['Полікарбонат', 'Скло'];
  lensColors = Color[''];
  frameColors = Color[''];
  // frameColors = [
  //   {id: 0, color: 'Білий'},
  //   {id: 1, color: 'Чорний'},
  //   {id: 2, color: 'Синій'},
  //   {id: 3, color: 'Червоний'},
  //   {id: 4, color: 'Жовтий'},
  //   {id: 5, color: 'Срібний'},
  //   {id: 6, color: 'Золотистий'},
  //   {id: 7, color: 'Коричневий'},
  //   {id: 8, color: 'Хамелеон'},
  //   {id: 10, color: 'Прозорий'},
  //   {id: 13, color: 'Чорно-червоний'},
  //   {id: 14, color: 'Чорно-жовтий'}
  // ];
  frameMaterials = ['Полікарбонат', 'Резина', 'Метал'];
  origins = ['Китай', 'Італія', 'Україна', 'Польща'];
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = {percentage: 0};

  selectedMainFiles: FileList;
  currentMainFileUpload: File;
  progressMain: { percentage: number } = {percentage: 0};


  @ViewChild('productImage') file;


  ngOnInit() {
    this.loadCategories();
    this.loadLensColors();
    this.loadFrameColors();
    this.initForm();

  }

  private loadCategories() {
    this.productsService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log('CAtegories', this.categories);
    });
  }

  private loadLensColors() {
    this.productsService.getLensColors().subscribe((data: Color[]) => {
      this.lensColors = data;
      console.log(this.lensColors);
    });
  }

  private loadFrameColors() {
    this.productsService.getFrameColors().subscribe((data: Color[]) => {
      this.frameColors = data;
      console.log(this.frameColors);
    });
  }

  private initForm() {
    this.addProductForm = this.fb.group({
      modelNumber: new FormControl('', [
        Validators.required
      ]),
      productMainImages: new FormArray([new FormControl(null, [
        // Validators.required
      ])]),
      productImages: new FormArray([new FormControl(null, [
        // Validators.required
      ])]),
      productCategory: new FormControl('', [
        Validators.required
      ]),
      productPrice: new FormControl('', [
        Validators.required,
        Validators.pattern('^[ 0-9]+$')
      ]),
      productLensColor: new FormControl('', [
        Validators.required
      ]),
      productLensWidth: new FormControl('', [
        Validators.required,
        Validators.pattern('^[ 0-9]+$')
      ]),
      productLensHeight: new FormControl('', [
        Validators.required,
        Validators.pattern('^[ 0-9]+$')
      ]),
      productLensMaterial: new FormControl('', [
        Validators.required,
      ]),
      productTotalWidth: new FormControl('', [
        Validators.required,
        Validators.pattern('^[ 0-9]+$')
      ]),
      productBracketLength: new FormControl('', [
        Validators.required,
        Validators.pattern('^[ 0-9]+$')
      ]),
      productFrameColor: new FormControl('', [
        Validators.required,
      ]),
      productFrameMaterial: new FormControl('', [
        Validators.required,
      ]),
      productOrigin: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  selectMainFile(event) {
    this.selectedMainFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.progressMain.percentage = 0;

    this.currentMainFileUpload = this.selectedMainFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      console.log('currentFileUpload', this.currentFileUpload);
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
        this.progressMain.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('selectedFiles!!!' + this.selectedFiles);
        console.log('selectedMainFiles!!!' + this.selectedMainFiles);
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }

  checker(controlName: string): string {
    if (this.addProductForm.controls[controlName].valid) {
      return 'is-valid';
    }
    if (this.addProductForm.controls[controlName].touched && this.addProductForm.controls[controlName].invalid) {
      return 'is-invalid';
    } else {
      return 'is-default';
    }
  }

  isControlRequired(controlName: string): boolean {
    const control = this.addProductForm.controls[controlName];

    const result = control.touched && control.hasError('required');

    return result;
  }

  isControlPatterned(controlName: string): boolean {
    const control = this.addProductForm.controls[controlName];

    const result = control.dirty && control.hasError('pattern');

    return result;
  }

  isControlEmpty(controlName: string): boolean {
    const control = this.addProductForm.controls[controlName];

    const result = control.value === '';

    return result;
  }

  addProduct() {
    this.progress.percentage = 0;
    this.progressMain.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.currentMainFileUpload = this.selectedMainFiles.item(0);
    const product: Product = {
      productDetails: {
        modelNumber: this.addProductForm.controls.modelNumber.value,
        price: this.addProductForm.controls.productPrice.value,
        lensWidth: this.addProductForm.controls.productLensWidth.value,
        lensHeight: this.addProductForm.controls.productLensHeight.value,
        lensMaterial: this.addProductForm.controls.productLensMaterial.value,
        totalWidth: this.addProductForm.controls.productTotalWidth.value,
        bracketLength: this.addProductForm.controls.productBracketLength.value,
        frameMaterial: this.addProductForm.controls.productFrameMaterial.value,
        origin: this.addProductForm.controls.productOrigin.value
      },
      category: {id: parseInt(this.addProductForm.controls.productCategory.value, 10)},
      lensColor: {id: parseInt(this.addProductForm.controls.productLensColor.value, 10)},
      frameColor: {id: parseInt(this.addProductForm.controls.productFrameColor.value, 10)},
      // image.ts: this.currentFileUpload
    };
    // console.log('productImage.value', this.currentFileUpload, this.currentMainFileUpload.name);
    // console.log(this.addProductForm.controls.productImages.value[0]);

    const json = JSON.stringify(product);
    const blob = new Blob([json], {type: 'application/json'});
    const formData = new FormData();

    formData.append('product', blob);
    formData.append('mainImage', this.currentMainFileUpload);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('image', this.selectedFiles.item(i));
      console.log(this.selectedFiles.item(i));
    }


    this.productsService.createProduct(formData)
      .subscribe((event) => {
          const mainFileSize = this.currentMainFileUpload.size;
          const filesSize = this.currentFileUpload.size;
          if (event.type === HttpEventType.UploadProgress) {
            // for (let i = 0; i < this.selectedFiles.length; i++) {
            //   filesSize += this.selectedFiles.item(i).pageSize;
            // }
            this.progress.percentage = Math.round(100 * (event.loaded - mainFileSize) / (event.total - mainFileSize));
            this.progressMain.percentage = Math.round(100 * (event.loaded - filesSize) / (event.total - filesSize));
            console.log(filesSize + 'and' + mainFileSize);

          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
          }
        }
      );
    this.selectedFiles = undefined;
    // this.selectedMainFiles = undefined;
  }

  // buildFormData(formData, data, parentKey?) {
  //   if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
  //     Object.keys(data).forEach(key => {
  //       this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
  //     });
  //   } else {
  //     const value = data == null ? '' : data;
  //
  //     formData.append(parentKey, value);
  //   }
  // }
  //
  // jsonToFormData(data) {
  //   const formData = new FormData();
  //
  //   this.buildFormData(formData, data);
  //
  //   return formData;
  // }

  // addImage(): void {
  //   (this.addProductForm.controls.productImages as FormArray).push(new FormControl('', [
  //     Validators.required]));
  // }

}
