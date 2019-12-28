import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../shared/models/product';
import {ProductsService} from '../../../shared/app-services/products.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Category} from '../../../shared/models/category';
import {Color} from '../../../shared/models/color';
import {CustomValidators} from '../../../shared/custom-validators';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {Diopter} from '../../../shared/models/diopter';
import {Material} from '../../../shared/models/material';
import {Origin} from '../../../shared/models/origin';
import {Sex} from '../../../shared/models/sex';

export enum KEY_CODE {
  ESCAPE = 27
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
  ) {
  }

  public isLoading = true;

  addProductForm: FormGroup;
  categories = Category[''];
  lensColors: Color[];
  frameColors: Color[];
  lensMaterials: Material[];
  frameMaterials: Material[];
  products: Product[];
  diopters: Diopter[];
  origins: Origin[];
  sexes: Sex[];
  polarization: boolean;

  expanded = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = {percentage: 0};
  freeModelNumber: number;

  selectedMainFiles: FileList;
  currentMainFileUpload: File;
  progressMain: { percentage: number } = {percentage: 0};
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

    this.initAddProductForm();

  }

  @HostListener('document:click', ['$event.target'])
  clickOutsideDiopters(targetElement) {
    if (!document.getElementById('diopters').contains(targetElement)) {
      this.hideDioptersCheckBoxes();
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

  private initAddProductForm() {
    this.addProductForm = this.fb.group({
      modelNumber: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]+$/, {hasDigit: true}),
        CustomValidators.intSrartsAtZeroValidator({intSrartsAtZero: true})
      ]),
      productMainImages: new FormArray([new FormControl(null, [])]),
      productImages: new FormArray([new FormControl(null, [
        // Validators.required
      ])]),
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

    this.modeLNumberValueChanges = this.addProductForm.controls.modelNumber.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((modelNumber) => {
        if (this.addProductForm.controls.modelNumber.valid) {
          this.getProductsByModelNumber(modelNumber);
        }
        this.initEnableOption();
      });

    this.lensColorValueChanges = this.addProductForm.controls.productLensColor.valueChanges.subscribe(() => {
      this.initEnableOption();
    });

    this.frameColorValueChanges = this.addProductForm.controls.productFrameColor.valueChanges.subscribe(() => {
      this.initEnableOption();
    });
  }

  private addDiopterCheckboxes() {
    this.diopters.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.addProductForm.controls.productDiopters as FormArray).push(control);
    });
  }

  private getProductsByModelNumber(modelNumber: number) {
    this.productsService.getProductsByModelNumber(modelNumber).subscribe(
      (productList: Product[]) => {
        this.products = productList;
        if (productList.length) {
          this.addProductForm.controls.productCategory.setValue(productList[0].productDetails.category.id);
          this.addProductForm.controls.productPrice.setValue(productList[0].productDetails.price);
          this.addProductForm.controls.productSex.setValue(productList[0].productDetails.sex.id);
          this.addProductForm.controls.productLensWidth.setValue(productList[0].productDetails.lensWidth);
          this.addProductForm.controls.productLensHeight.setValue(productList[0].productDetails.lensHeight);
          this.addProductForm.controls.productPolarization.setValue(productList[0].productDetails.polarization);
          this.addProductForm.controls.productLensMaterial.setValue(productList[0].productDetails.lensMaterial.id);
          this.addProductForm.controls.productTotalWidth.setValue(productList[0].productDetails.totalWidth);
          this.addProductForm.controls.productBracketLength.setValue(productList[0].productDetails.bracketLength);
          this.addProductForm.controls.productFrameMaterial.setValue(productList[0].productDetails.frameMaterial.id);
          this.addProductForm.controls.productOrigin.setValue(productList[0].productDetails.origin.id);
        }
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
        if (_.isEmpty(this.addProductForm.controls.productLensColor.value)
          && _.isEmpty(this.addProductForm.controls.productFrameColor.value)) {
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

        if (!_.isEmpty(this.addProductForm.controls.productLensColor.value)) {
          const lensColorMatches = lensFrameColorCoupleArray.filter((couple => {
            const equal = parseInt(couple[0], 10) == this.addProductForm.controls.productLensColor.value;
            return equal;
          }));

          this.frameColors.forEach(frameColor => {
            const frameColorMatches = lensColorMatches.find(match => frameColor.id == parseInt(match[1], 10)
            );
            frameColor.enableOption = _.isUndefined(frameColorMatches) ? true : false;
          });
        }

        if (!_.isEmpty(this.addProductForm.controls.productFrameColor.value)) {
          const frameColorMatches = lensFrameColorCoupleArray.filter((couple => {
            const equal = parseInt(couple[1], 10) == this.addProductForm.controls.productFrameColor.value;
            return equal;
          }));

          this.lensColors.forEach(lensColor => {
            const lensColorMatches = frameColorMatches.find(match => lensColor.id == parseInt(match[0], 10)
            );
            lensColor.enableOption = _.isUndefined(lensColorMatches) ? true : false;
          });
        }
      }
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  selectMainFile(event) {
    this.selectedMainFiles = event.target.files;
  }

  checker(controlName: string): string {
    if (this.addProductForm.controls[controlName].valid) {
      return 'is-valid';
    } else if (this.addProductForm.controls[controlName].touched && this.addProductForm.controls[controlName].invalid) {
      return 'is-invalid';
    } else {
      return 'is-default';
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.addProductForm.get(controlName);

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

  addProduct() {
    this.isLoading = true;
    this.progress.percentage = 0;
    this.progressMain.percentage = 0;
    const diopersCtrlIdsArray: Diopter[] = [];
    this.diopters.filter(diopter => {
      return diopter.checked === true;
    }).forEach(diopter => diopersCtrlIdsArray.push(new Diopter(diopter.id)));

    const product: Product = {
      productDetails: {
        modelNumber: this.addProductForm.controls.modelNumber.value,
        price: this.addProductForm.controls.productPrice.value,
        category: {id: parseInt(this.addProductForm.controls.productCategory.value, 10)},
        sex: {id: parseInt(this.addProductForm.controls.productSex.value, 10)},
        lensWidth: this.addProductForm.controls.productLensWidth.value,
        lensHeight: this.addProductForm.controls.productLensHeight.value,
        lensMaterial: {id: parseInt(this.addProductForm.controls.productLensMaterial.value, 10)},
        totalWidth: this.addProductForm.controls.productTotalWidth.value,
        bracketLength: this.addProductForm.controls.productBracketLength.value,
        polarization: this.addProductForm.controls.productPolarization.value,
        frameMaterial: {id: parseInt(this.addProductForm.controls.productFrameMaterial.value, 10)},
        origin: {id: parseInt(this.addProductForm.controls.productOrigin.value, 10)}
      },
      diopters: diopersCtrlIdsArray,
      lensColor: {id: parseInt(this.addProductForm.controls.productLensColor.value, 10)},
      frameColor: {id: parseInt(this.addProductForm.controls.productFrameColor.value, 10)},
    };

    const json = JSON.stringify(product);
    const blob = new Blob([json], {type: 'application/json'});
    const formData = new FormData();

    formData.append('product', blob);

    if (this.selectedMainFiles) {
      this.currentMainFileUpload = this.selectedMainFiles.item(0);
      formData.append('mainImage', this.currentMainFileUpload);
    }

    if (this.selectedFiles) {
      this.currentFileUpload = this.selectedFiles.item(0);
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('image', this.selectedFiles.item(i));
      }
    }

    this.productsService.createProduct(formData)
      .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (this.currentMainFileUpload) {
              const mainFileSize = this.currentMainFileUpload.size;
              this.progress.percentage = Math.round(100 * (event.loaded - mainFileSize) / (event.total - mainFileSize));
            }

            if (this.currentFileUpload) {
              const filesSize = this.currentFileUpload.size;
              this.progressMain.percentage = Math.round(100 * (event.loaded - filesSize) / (event.total - filesSize));
            }

          } else if (event instanceof HttpResponse) {
            this.isLoading = false;
          }
          this.getProductsByModelNumber(this.addProductForm.controls.modelNumber.value);
        });
    this.selectedFiles = undefined;
  }

 get addProductFormMainImages() {
   return this.addProductForm.get('productMainImages') as FormArray;
 }

  get addProductFormProductImages() {
    return this.addProductForm.get('productImages') as FormArray;
  }

  get addProductFormProductDiopters() {
    return this.addProductForm.get('productDiopters') as FormArray;
  }
}
