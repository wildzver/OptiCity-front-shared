import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../../../shared/app-services/products.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-upload-products',
  templateUrl: './upload-products.component.html',
  styleUrls: ['./upload-products.component.scss']
})
export class UploadProductsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
  ) {
  }

  uploadProductsForm: FormGroup;
  uploadImagesForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  selectedMainImages: FileList;
  currentMainImageUpload: File;
  selectedImages: FileList;
  currentImageUpload: File;
  progress: { percentage: number } = {percentage: 0};
  imagesProgress: { percentage: number } = {percentage: 0};
  products: Product[];
  newProducts: Product[];

  ngOnInit() {
    this.productsService.getProductsWithoutImages().subscribe(data => this.products = data);

    this.initUploadProductsForm();
    this.initUploadImagesForm();
  }

  private initUploadProductsForm() {
    this.uploadProductsForm = this.fb.group({
      excelProductsFile: new FormControl(null)
    });
  }

  private initUploadImagesForm() {
    this.uploadImagesForm = this.fb.group({
      mainImage: new FormArray([new FormControl('')]),
      images: new FormArray([new FormControl('')]),
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    if (this.currentFileUpload) {
      if (this.currentFileUpload.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      } else {
        alert('Invalid format!');
        this.uploadProductsForm.controls.excelProductsFile.setValue('');
      }
    }
  }

  private selectMainImage(event) {
    this.selectedMainImages = event.target.files;
    this.currentMainImageUpload = this.selectedMainImages.item(0);
    if (this.currentMainImageUpload) {
      if (this.currentMainImageUpload.type.match('image.*')) {
        const size = this.currentMainImageUpload.size;
        if (size > 1000000) {
          alert('size must not exceeds 1 MB');
          this.mainImageArray.at(0).setValue('');
        }
      } else {
        alert('Invalid format!');
        this.mainImageArray.at(0).setValue('');
      }
    }
  }

  private selectImages(event) {
    this.selectedImages = event.target.files;

    for (let i = 0; i < this.selectedImages.length; i++) {
      this.currentImageUpload = this.selectedImages.item(i);
      if (this.currentImageUpload) {
        if (this.currentImageUpload.type.match('image.*')) {
          const size = this.currentImageUpload.size;
          if (size > 1000000) {
            alert('size must not exceeds 1 MB');
            this.imagesArray.controls.forEach(control => control.setValue(''));
          }
        } else {
          alert('Invalid format!');
          this.imagesArray.controls.forEach(control => control.setValue(''));
        }
      }
    }
  }

  uploadProducts() {
    this.progress.percentage = 0;
    const formData = new FormData();

    formData.append('excelProducts', this.currentFileUpload);

    this.productsService.uploadProducts(formData)
      .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.products = event.body;
          }
        });
  }

  private uploadImages(productId: number, index: number) {
    if (this.selectedMainImages) {
      this.imagesProgress.percentage = 0;
    }
    const formData = new FormData();

    formData.append('mainImage', this.currentMainImageUpload);
    if (this.selectedImages) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        formData.append('image', this.selectedImages.item(i));
      }
    }

    this.productsService.uploadProductImages(productId, formData)
      .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.imagesProgress.percentage = Math.round(100 * event.loaded / event.total);

          } else if (event instanceof HttpResponse) {
            // this.removeProduct(index);
            this.productsService.getProductsWithoutImages().subscribe(products => {
              this.products = products;
              this.initUploadImagesForm();
            });
          }
        });
  }

  get mainImageArray() {
    return (this.uploadImagesForm.get('mainImage') as FormArray);
  }

  get imagesArray() {
    return (this.uploadImagesForm.get('images') as FormArray);
  }

  deleteProduct(product: Product): void {
    this.productsService.deleteProduct(product)
      .subscribe(data => {
        this.products = this.products.filter(u => u !== product);
      });
  }
}
