import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../shared/app-services/products.service';
import {Category} from '../../../shared/models/category';
import {Color} from '../../../shared/models/color';
import {Material} from '../../../shared/models/material';
import {Product} from '../../../shared/models/product';
import {Diopter} from '../../../shared/models/diopter';
import {Origin} from '../../../shared/models/origin';
import {Sex} from '../../../shared/models/sex';
import {Subscription} from 'rxjs';
import {CustomValidators} from '../../../shared/custom-validators';
import * as _ from 'lodash';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {KEY_CODE} from '../add-product/add-product.component';
import {ActivatedRoute} from '@angular/router';
import {Image} from '../../../shared/models/image';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
  }

  editProductForm: FormGroup;
  categories = Category[''];
  lensColors: Color[];
  frameColors: Color[];
  lensMaterials: Material[];
  frameMaterials: Material[];
  products: Product[];
  product: Product;
  productImagesUrl = 'https://api.opticity.com.ua/api/product-image/';
  mainImage: Image;
  addedImages: Image[] = new Array();
  diopters: Diopter[];
  origins: Origin[];
  sexes: Sex[];
  polarization: boolean;
  expanded = false;
  freeModelNumber: number;
  selectedMainImages: FileList;
  currentMainImageUpload: File;
  progressMainImages: { percentage: number } = {percentage: 0};
  selectedImages: FileList;
  currentImageUpload: File;
  progressAddedImages: { percentage: number } = {percentage: 0};
  modeLNumberValueChanges: Subscription;
  lensColorValueChanges: Subscription;
  frameColorValueChanges: Subscription;

  @ViewChild('productImage') file;

  ngOnInit() {

    this.loadCategories();
    this.loadLensColors();
    this.loadFrameColors();
    this.loadFreeModelNumber();
    this.loadLensMaterials();
    this.loadFrameMaterials();
    this.loadSexes();
    this.loadDiopters();
    this.loadOrigins();

    this.initEditProductForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getProductById(id);
    });
  }

  private getProductById(id) {
    this.productsService.getProductById(id).subscribe(product => {
      this.product = product;
      if (product) {
        this.editProductForm.controls.modelNumber.setValue(product.productDetails.modelNumber);
        this.editProductForm.controls.productCategory.setValue(product.productDetails.category.id);
        this.editProductForm.controls.productPrice.setValue(product.productDetails.price);
        this.editProductForm.controls.productSex.setValue(product.productDetails.sex.id);
        this.editProductForm.controls.productLensColor.setValue(product.lensColor.id);
        this.editProductForm.controls.productLensWidth.setValue(product.productDetails.lensWidth);
        this.editProductForm.controls.productLensHeight.setValue(product.productDetails.lensHeight);
        this.editProductForm.controls.productLensMaterial.setValue(product.productDetails.lensMaterial.id);
        this.editProductForm.controls.productTotalWidth.setValue(product.productDetails.totalWidth);
        this.editProductForm.controls.productBracketLength.setValue(product.productDetails.bracketLength);
        this.editProductForm.controls.productPolarization.setValue(product.productDetails.polarization);
        this.editProductForm.controls.productFrameColor.setValue(product.frameColor.id);
        this.editProductForm.controls.productFrameMaterial.setValue(product.productDetails.frameMaterial.id);
        this.editProductForm.controls.productOrigin.setValue(product.productDetails.origin.id);

        product.diopters.map(productDiopter => {
          const foundDiopter = this.diopters.find(diopter => diopter.id == productDiopter.id);
          if (foundDiopter) {
            foundDiopter.checked = true;
          }
        });

        setTimeout(() => {
          if (product.images.length) {
            this.findMainImage(product.images);
            this.findAddedImages(product.images);
          }
        }, 200);
      }
    });
  }

  private findMainImage(images: Image[]) {
    this.mainImage = images.find(value => value.mainImage === true);
  }

  private findAddedImages(images: Image[]) {
    this.addedImages = images.filter(image => image.mainImage === false);
  }

  private removeImage(imageId) {
    this.productsService.deleteProductImage(this.product.id, imageId).subscribe(
      images => {
        this.findMainImage(images);
        this.findAddedImages(images);
      });
  }

  @HostListener('document:click', ['$event.target'])
  clickOutsideDiopters(targetElement) {
    if (!document.getElementById('diopters').contains(targetElement)) {
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.hideDioptersCheckBoxes();
    }
  }

  toggleDioptersCheckboxes() {
    const checkboxes = document.getElementById('diopter-checkboxes');
    if (this.expanded === false) {
      this.showDioptersCheckBoxes();
    } else {
      this.hideDioptersCheckBoxes();
    }
  }

  private showDioptersCheckBoxes() {
    document.getElementById('diopter-checkboxes').style.display = 'block';
    this.expanded = true;
  }

  private hideDioptersCheckBoxes() {
    document.getElementById('diopter-checkboxes').style.display = 'none';
    this.expanded = false;
  }

  private loadFreeModelNumber() {
    this.productsService.getFreeModelNumber().subscribe(modelNumber => {
      this.freeModelNumber = modelNumber;
    });
  }

  private loadCategories() {
    this.productsService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  private loadLensColors() {
    this.productsService.getLensColors().subscribe((lensColors: Color[]) => {
      this.lensColors = lensColors.map(lensColor => {
        lensColor.enableOption = true;
        lensColor.enableOption = true;
        return lensColor;
      });
    });
  }

  private loadFrameColors() {
    this.productsService.getFrameColors().subscribe((frameColors: Color[]) => {
      this.frameColors = frameColors.map(frameColor => {
        frameColor.enableOption = true;
        return frameColor;
      });
    });
  }

  private loadLensMaterials() {
    this.productsService.getLensMaterials().subscribe((lensMaterials: Material[]) => {
      this.lensMaterials = lensMaterials.map(lensMaterial => {
        lensMaterial.enableOption = true;
        return lensMaterial;
      });
    });
  }

  private loadFrameMaterials() {
    this.productsService.getFrameMaterials().subscribe((frameMaterials: Material[]) => {
      this.frameMaterials = frameMaterials.map(frameMaterial => {
        frameMaterial.enableOption = true;
        return frameMaterial;
      });
    });
  }

  private loadOrigins() {
    this.productsService.getOrigins().subscribe((origins: Origin[]) => {
      this.origins = origins.map(origin => {
        origin.enableOption = true;
        return origin;
      });
    });
  }

  private loadSexes() {
    this.productsService.getSexes().subscribe((sexes: Sex[]) => {
      this.sexes = sexes.map(sex => {
        sex.enableOption = true;
        return sex;
      });
    });
  }

  private loadDiopters() {
    this.productsService.getDiopters().subscribe((diopters: Diopter[]) => {
      this.diopters = diopters.map(diopter => {
        diopter.checked = false;
        return diopter;
      });
      this.addDiopterCheckboxes();
    });
  }

  private initEditProductForm() {
    this.editProductForm = this.fb.group({
      modelNumber: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]+$/, {hasDigit: true}),
        CustomValidators.intSrartsAtZeroValidator({intSrartsAtZero: true})
      ]),
      productMainImages: new FormArray([new FormControl(null, [])]),
      productImages: new FormArray([new FormControl(null, [])]),
      productCategory: new FormControl('', [
        Validators.required
      ]),
      productDiopters: new FormArray([]),
      productPrice: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]+$/, {hasDigit: true}),
        CustomValidators.intSrartsAtZeroValidator({intSrartsAtZero: true})
      ]),
      productSex: new FormControl('', [
        Validators.required
      ]),
      productLensColor: new FormControl('', [
        Validators.required
      ]),
      productLensWidth: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]+$/, {hasDigit: true}),
        CustomValidators.intSrartsAtZeroValidator({intSrartsAtZero: true})
      ]),
      productLensHeight: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]+$/, {hasDigit: true}),
        CustomValidators.intSrartsAtZeroValidator({intSrartsAtZero: true})
      ]),
      productLensMaterial: new FormControl('', [
        Validators.required,
      ]),
      productTotalWidth: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]+$/, {hasDigit: true}),
        CustomValidators.intSrartsAtZeroValidator({intSrartsAtZero: true})
      ]),
      productBracketLength: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]+$/, {hasDigit: true}),
        CustomValidators.intSrartsAtZeroValidator({intSrartsAtZero: true})
      ]),
      productPolarization: new FormControl(false),
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

    this.modeLNumberValueChanges = this.editProductForm.controls.modelNumber.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((modelNumber) => {
        if (this.editProductForm.controls.modelNumber.valid) {
          this.getProductsByModelNumber(modelNumber);
        }
        this.initEnableOption();
      });

    this.lensColorValueChanges = this.editProductForm.controls.productLensColor.valueChanges.subscribe(() => {
      this.initEnableOption();
    });

    this.frameColorValueChanges = this.editProductForm.controls.productFrameColor.valueChanges.subscribe(() => {
      this.initEnableOption();
    });

  }

  private addDiopterCheckboxes() {
    this.diopters.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.editProductForm.controls.productDiopters as FormArray).push(control);
    });
  }

  private getProductsByModelNumber(modelNumber: number) {
    this.productsService.getProductsByModelNumber(modelNumber).subscribe(
      (productList: Product[]) => {
        this.products = productList;
        this.initEnableOption();
        this.loadFreeModelNumber();
      });
  }

  private initEnableOption() {
    if (_.isUndefined(this.products)) {
      return null;
    } else {
      const lensFrameColorCoupleArray: string[][] = [];
      this.products.forEach((product: Product) => {
        const lensFrameColorCouple = product.productNumber.split('_');
        lensFrameColorCouple.shift();
        lensFrameColorCoupleArray.push(lensFrameColorCouple);
      });

      if ((Array.isArray(this.lensColors) && (this.lensColors.length || !_.isUndefined(this.lensColors))) &&
        (Array.isArray(this.frameColors) && (this.frameColors.length || !_.isUndefined(this.frameColors)))) {
        if (_.isEmpty(this.editProductForm.controls.productLensColor.value)
          && _.isEmpty(this.editProductForm.controls.productFrameColor.value)) {
          this.lensColors.forEach(lensColor => {
            const matches = lensFrameColorCoupleArray.filter(couple => parseInt(couple[0], 10) == lensColor.id);
            const numberMatches = matches.length;
            if (numberMatches == this.frameColors.length) {
              lensColor.enableOption = false;
            }
          });
          this.frameColors.forEach(frameColor => {
            const numberMatches = lensFrameColorCoupleArray.filter(couple => parseInt(couple[1], 10) == frameColor.id).length;
            if (numberMatches == this.lensColors.length) {
              frameColor.enableOption = false;
            }
          });
        }

        if (!_.isEmpty(this.editProductForm.controls.productLensColor.value)) {
          const lensColorMatches = lensFrameColorCoupleArray.filter((couple => {
            const equal = parseInt(couple[0], 10) == this.editProductForm.controls.productLensColor.value;
            return equal;
          }));

          this.frameColors.forEach(frameColor => {
            const frameColorMatches = lensColorMatches.find(match => frameColor.id == parseInt(match[1], 10)
            );
            frameColor.enableOption = _.isUndefined(frameColorMatches) ? true : false;
          });
        }

        if (!_.isEmpty(this.editProductForm.controls.productFrameColor.value)) {
          const frameColorMatches = lensFrameColorCoupleArray.filter(couple => {
            const equal = parseInt(couple[1], 10) == this.editProductForm.controls.productFrameColor.value;
            return equal;
          });

          this.lensColors.forEach(lensColor => {
            const lensColorMatches = frameColorMatches.find(match => lensColor.id == parseInt(match[0], 10)
            );
            lensColor.enableOption = _.isUndefined(lensColorMatches) ? true : false;
          });
        }
      }
    }
  }

  private selectMainImage(event) {
    this.selectedMainImages = event.target.files;
    this.progressMainImages.percentage = 0;

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

    this.uploadProductImages();
  }

  private selectImages(event) {
    this.selectedImages = event.target.files;
    this.progressAddedImages.percentage = 0;

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
    this.uploadProductImages();
  }

  get mainImageArray() {
    return (this.editProductForm.get('productMainImages') as FormArray);
  }

  get imagesArray() {
    return (this.editProductForm.get('productImages') as FormArray);
  }

  private uploadProductImages() {
    this.progressMainImages.percentage = 0;
    this.progressAddedImages.percentage = 0;

    const formData = new FormData();
    if (this.selectedMainImages) {
      formData.append('mainImage', this.currentMainImageUpload);
    }

    if (this.selectedImages) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        formData.append('image', this.selectedImages.item(i));
      }
    }
    this.productsService.uploadProductImages(this.product.id, formData)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.launchProgressBar(event);

        } else if (event instanceof HttpResponse) {
          this.mainImage = null;
          this.productsService.getProductImages(this.product.id).subscribe(images => {
            if (this.selectedMainImages) {
              setTimeout(() => {
                this.selectedMainImages = undefined;
                this.mainImageArray.at(0).setValue('');
              }, 2000);
            }

            if (this.selectedImages) {
              setTimeout(() => {
                this.selectedImages = undefined;
                this.imagesArray.controls.forEach(control => control.setValue(''));
              }, 2000);
            }
            this.findMainImage(images);
            this.findAddedImages(images);
          });
        }
      });
  }

  checker(controlName: string): string {
    if (this.editProductForm.controls[controlName].valid) {
      return 'is-valid';
    } else if (this.editProductForm.controls[controlName].touched && this.editProductForm.controls[controlName].invalid) {
      return 'is-invalid';
    } else {
      return 'is-default';
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.editProductForm.get(controlName);

    return (control.touched || control.dirty) && control.hasError(error);
  }

  changeDiopter(diopterId) {
    const diopter = this.diopters.find(value => value.id === diopterId);
    if (this.diopters) {
      diopter.checked = !diopter.checked;
    }
  }

  changePolarization() {
    this.polarization = !this.polarization;
  }

  private getCheckedDioptersIds(): Diopter[] {
    const dioptersCtrlIdsArray: Diopter[] = [];
    this.diopters.filter(diopter => {
      return diopter.checked === true;
    }).forEach(diopter => dioptersCtrlIdsArray.push(new Diopter(diopter.id)));
    return dioptersCtrlIdsArray;
  }

  updateProduct() {
    this.progressAddedImages.percentage = 0;
    this.progressMainImages.percentage = 0;
    const product: Product = {
      productDetails: {
        modelNumber: this.editProductForm.controls.modelNumber.value,
        price: this.editProductForm.controls.productPrice.value,
        category: {id: parseInt(this.editProductForm.controls.productCategory.value, 10)},
        sex: {id: parseInt(this.editProductForm.controls.productSex.value, 10)},
        lensWidth: this.editProductForm.controls.productLensWidth.value,
        lensHeight: this.editProductForm.controls.productLensHeight.value,
        lensMaterial: {id: parseInt(this.editProductForm.controls.productLensMaterial.value, 10)},
        totalWidth: this.editProductForm.controls.productTotalWidth.value,
        bracketLength: this.editProductForm.controls.productBracketLength.value,
        polarization: this.editProductForm.controls.productPolarization.value,
        frameMaterial: {id: parseInt(this.editProductForm.controls.productFrameMaterial.value, 10)},
        origin: {id: parseInt(this.editProductForm.controls.productOrigin.value, 10)}
      },
      diopters: this.getCheckedDioptersIds(),
      lensColor: {id: parseInt(this.editProductForm.controls.productLensColor.value, 10)},
      frameColor: {id: parseInt(this.editProductForm.controls.productFrameColor.value, 10)},
    };

    const json = JSON.stringify(product);
    const blob = new Blob([json], {type: 'application/json'});
    const formData = new FormData();

    formData.append('product', blob);

    this.productsService.updateProduct(this.product.id, formData)
      .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
          }
          this.getProductsByModelNumber(this.editProductForm.controls.modelNumber.value);
        });
  }

  private launchProgressBar(event) {
    if (this.currentMainImageUpload) {
      const mainFileSize = this.currentMainImageUpload.size;
      this.progressAddedImages.percentage = Math.round(100 * (event.loaded - mainFileSize) / (event.total - mainFileSize));
    }

    if (this.currentImageUpload) {
      const filesSize = this.currentImageUpload.size;
      this.progressMainImages.percentage = Math.round(100 * (event.loaded - filesSize) / (event.total - filesSize));
    }
  }

  get editProductFormProductDiopters() {
    return this.editProductForm.get('productDiopters') as FormArray;
  }

  get editProductFormMainImages() {
    return this.editProductForm.get('productMainImages') as FormArray;
  }

  get editProductFormProductImages() {
    return this.editProductForm.get('productImages') as FormArray;
  }

}
