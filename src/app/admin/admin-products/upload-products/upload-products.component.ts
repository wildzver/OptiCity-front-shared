import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../../../shared/services/products.service';
import {UploadFileService} from '../../../shared/services/upload-file.service';
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
      excelProductsFiles: new FormArray([new FormControl(null)])
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
  }

  private selectMainImage(event) {
    this.selectedMainImages = event.target.files;
    // this.uploadImagesForm.patchValue({
    //   mainImage: event.target.files[0]
    // });
  }

  private selectImages(event) {
    this.selectedImages = event.target.files;
    // this.uploadImagesForm.patchValue({
    //   images: event.target.files
    // });
  }

  uploadProducts() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
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
    // this.selectedFiles = undefined;
  }

  private uploadImages(productNumber: string, index: number) {
    this.imagesProgress.percentage = 0;
    this.currentMainImageUpload = this.selectedMainImages.item(0);
    // this.uploadImagesForm.controls.mainImage.setValue( this.currentMainImageUpload ? this.currentMainImageUpload.name : '');
    // this.uploadImagesForm.controls.images.setValue(this.selectedImages ? this.selectedImages.item(0) : '');


    // this.currentImageUpload = this.selectedImages.item(0);
    const json = JSON.stringify(productNumber);
    const blob = new Blob([json], {type: 'application/json'});
    const formData = new FormData();

    formData.append('productNumber', productNumber);
    formData.append('mainImage', this.currentMainImageUpload);

    for (let i = 0; i < this.selectedImages.length; i++) {
      formData.append('image', this.selectedImages.item(i));
      console.log(this.selectedImages.item(i));
    }

    this.productsService.uploadProductImages(formData)
      .subscribe((event: any) => {
          console.log('THIS IS MY IMAGE BODY!!!', event.body);
          if (event.type === HttpEventType.UploadProgress) {
            this.imagesProgress.percentage = Math.round(100 * event.loaded / event.total);

          } else if (event instanceof HttpResponse) {
            this.removeProduct(index);
            this.products = event.body;
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
      .subscribe(data => {this.products = this.products.filter(u => u !== product);
      });
  }
}
