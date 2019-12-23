import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../../../shared/app-services/products.service';
import {UploadFileService} from '../../../shared/app-services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-upload-products',
  templateUrl: './upload-products.component.html',
  styleUrls: ['./upload-products.component.scss']
})
export class UploadProductsComponent implements OnInit, AfterContentChecked {

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private uploadService: UploadFileService
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

  private selectFile(event) {
    this.selectedFiles = event.target.files;
    // console.log('my excel format' + this.selectedImages.item(0).type);
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

    // this.uploadImagesForm.patchValue({
    //   mainImage: event.target.files[0]
    // });
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

    // this.uploadImagesForm.patchValue({
    //   images: event.target.files
    // });
  }

  uploadProducts() {
    this.progress.percentage = 0;
    // this.currentImageUpload = this.selectedImages.item(0);
    const formData = new FormData();

    formData.append('excelProducts', this.currentFileUpload);

    this.productsService.uploadProducts(formData)
      .subscribe((event: any) => {
          console.log('THIS IS MY BODY!!!', event.body);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);

          } else if (event instanceof HttpResponse) {
            this.products = event.body;
            console.log('THIS IS NEW PRODUCTS FOR ...!', this.products);
          }
        }
      );
    // this.selectedImages = undefined;
  }

  private uploadImages(productId: number, index: number) {
    if (this.selectedMainImages) {
      this.imagesProgress.percentage = 0;
    }
    // this.currentMainImageUpload = this.selectedMainImages.item(0);
    // this.uploadImagesForm.controls.mainImage.setValue( this.currentMainImageUpload ? this.currentMainImageUpload.name : '');
    // this.uploadImagesForm.controls.images.setValue(this.selectedImages ? this.selectedImages.item(0) : '');


    // this.currentImageUpload = this.selectedImages.item(0);
    // const json = JSON.stringify(productId);
    // const blob = new Blob([json], {type: 'application/json'});
    const formData = new FormData();

    // formData.append('productNumber', productId);
    formData.append('mainImage', this.currentMainImageUpload);
    if (this.selectedImages) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        formData.append('image', this.selectedImages.item(i));
        console.log(this.selectedImages.item(i));
      }
    }

    this.productsService.uploadProductImages(productId, formData)
      .subscribe((event: any) => {
          console.log('THIS IS MY IMAGE BODY!!!', event.body);
          if (event.type === HttpEventType.UploadProgress) {
            this.imagesProgress.percentage = Math.round(100 * event.loaded / event.total);

          } else if (event instanceof HttpResponse) {
            // this.removeProduct(index);
            this.productsService.getProductsWithoutImages().subscribe(products => {
              this.products = products;

              this.initUploadImagesForm();
            });
            // this.products = event.body;
            console.log('THIS IS IMAGES FOR PRODUCT!!!', this.products);
          }
        }
      );
    // this.selectedMainImages = undefined;
    // this.selectedImages = undefined;

  }

  ngAfterContentChecked(): void {
    // if (this.newProducts != null) {
    //   this.products = this.newProducts;
    // }
  }

  removeProduct(index) {
    this.mainImageArray.removeAt(index);
    this.imagesArray.removeAt(index);
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
