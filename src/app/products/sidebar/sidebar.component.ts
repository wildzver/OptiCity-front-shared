import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category';
import {ProductsService} from '../../shared/app-services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Color} from '../../shared/models/color';
import {FilterService} from '../../shared/app-services/filter.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Material} from '../../shared/models/material';
import {Sex} from '../../shared/models/sex';
import {Diopter} from '../../shared/models/diopter';
import {debounceTime, distinctUntilChanged, min} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewChecked {

  categories = Category[''];
  sexes: Sex[];
  minPrice: number;
  maxPrice: number;
  serverMinPrice: number;
  serverMaxPrice: number;
  minPriceMinRange = 0;
  minPriceMaxRange = 0;
  maxPriceMinRange: number;
  maxPriceMaxRange: number;
  lensColors: Color[];
  frameColors: Color[];
  frameMaterials: Material[];
  diopters: Diopter[];
  polarization: boolean;
  category: string;
  searchedSexes = new Array<any>();
  searchedLensColors = new Array<any>();
  searchedFrameColors = new Array<any>();
  searchedFrameMaterials = new Array<any>();
  searchedDiopters = new Array<any>();
  lensColorUrl = 'https://api.opticity.com.ua/api/lensColor-image/';
  frameColorUrl = 'https://api.opticity.com.ua/api/frameColor-image/';

  private routeSubscription: Subscription;

  @Input()
  filterForm: FormGroup;

  querySubscription = new Subscription();

  minPriceSubscription = this.filterService.currentMinPrice.subscribe(
    minPrice => {
      this.minPrice = minPrice;
      this.minPriceMaxRange = this.minPrice;
      if (this.minPriceMaxRange > this.maxPrice) {
        this.maxPrice = this.minPriceMaxRange;
      }
    });

  maxPriceSubscription = this.filterService.currentMaxPrice.subscribe(
    maxPrice => {
      this.maxPrice = maxPrice;
      if (this.maxPrice) {
        this.maxPriceMinRange = this.maxPrice;
      }
    });

  sexesSubscription = this.filterService.currentSearchedSexes.subscribe(
    sex => this.searchedSexes = sex);

  lensColorsSubscription = this.filterService.currentSearchedLensColors.subscribe(
    lensColors => this.searchedLensColors = lensColors);

  frameColorsSubscription = this.filterService.currentSearchedFrameColors.subscribe(
    frameColors => this.searchedFrameColors = frameColors);

  frameMaterialsSubscription = this.filterService.currentSearchedFrameMaterials.subscribe(
    frameMaterial => this.searchedFrameMaterials = frameMaterial);

  dioptersSubscription = this.filterService.currentSearchedDiopters.subscribe(
    diopter => this.searchedDiopters = diopter);

  polarizationSubscription = this.filterService.currentPolarization.subscribe(
    polarization => this.polarization = polarization);

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
              private filterService: FilterService,
              private fb: FormBuilder,
              private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.querySubscription
      .add(this.minPriceSubscription)
      .add(this.maxPriceSubscription)
      .add(this.sexesSubscription)
      .add(this.lensColorsSubscription)
      .add(this.frameColorsSubscription)
      .add(this.frameMaterialsSubscription)
      .add(this.dioptersSubscription)
      .add(this.polarizationSubscription);
    this.loadSexes();
    this.loadLensColors();
    this.loadFrameColors();
    this.loadFrameMaterials();
    this.loadDiopters();
    this.routeSubscription = this.activatedRoute.params.subscribe(params => this.category = params.category);
    this.loadCategories();
    this.initFilterForm();
    this.filterForm.controls.minPrice.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((minPrice) => {
        if ((!Number.isInteger(minPrice) && minPrice != null) || minPrice < 0) {
          this.getServerMinPrice();
        }
        this.doPriceFilter();
        this.setRangeWidth();
      });
    this.filterForm.controls.maxPrice.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((maxPrice) => {
        if ((!Number.isInteger(maxPrice) && maxPrice != null) || maxPrice < 0) {
          this.getServerMaxPrice();
        }
        this.doPriceFilter();
        this.setRangeWidth();
      });

    this.productsService.getMinPrice().subscribe(minPrice => {
      this.serverMinPrice = minPrice;
      this.minPriceMinRange = minPrice;
      if (!this.minPrice) {
        this.minPriceMaxRange = minPrice;
      }
    });

    this.productsService.getMaxPrice().subscribe(maxPrice => {
      this.serverMaxPrice = maxPrice;
      if (!this.maxPrice) {
        this.maxPriceMinRange = maxPrice;
      }
      this.maxPriceMaxRange = maxPrice;
      this.setRangeWidth();
    });
  }

  private setRangeWidth() {
    const totalSlideWidth = document.getElementById('min-range').parentElement.offsetWidth;
    const priceLength = this.maxPriceMaxRange - this.minPriceMinRange;
    const pixelPrice = 185 / priceLength;
    let newMinRangeWidth = (this.maxPriceMinRange - this.minPriceMinRange) * pixelPrice;
    let newMaxRangeWidth = (this.maxPriceMaxRange - this.minPriceMaxRange) * pixelPrice;
    if (newMinRangeWidth > 0 && newMinRangeWidth < 200) {
      newMinRangeWidth = newMinRangeWidth + 7.5;
    }
    if (newMinRangeWidth === 0) {
      newMinRangeWidth = 15;
      newMaxRangeWidth = 177.5;
    }
    if (newMaxRangeWidth > 0 && newMaxRangeWidth < 200) {
      newMaxRangeWidth = newMaxRangeWidth + 7.5;
    }
    if (newMaxRangeWidth === 0) {
      newMaxRangeWidth = 15;
      newMinRangeWidth = 185;
    }
    const minRangeElem = document.getElementById('min-range');
    minRangeElem.style.width = newMinRangeWidth.toString().concat('px');
    const maxRangeElem = document.getElementById('max-range');
    maxRangeElem.style.width = newMaxRangeWidth.toString().concat('px');
  }

  private getServerMinPrice() {
    this.productsService.getMinPrice().subscribe(min => this.filterForm.controls.minPrice.setValue(min));
  }

  private getServerMaxPrice() {
    this.productsService.getMaxPrice().subscribe(max => this.filterForm.controls.maxPrice.setValue(max));
  }

  private initFilterForm() {
    const queryParamMap = this.activatedRoute.snapshot.queryParamMap;

    this.filterForm = this.fb.group({
      sexes: new FormArray([]),
      minPrice: new FormControl(
        queryParamMap.has('minprice') || (!queryParamMap.has('minprice') && this.minPrice !== 0) ? this.minPrice : null),
      maxPrice: new FormControl(
        queryParamMap.has('maxprice') || (!queryParamMap.has('maxprice') && this.maxPrice !== 0) ? this.maxPrice : null),
      lensColors: new FormArray([]),
      frameColors: new FormArray([]),
      frameMaterials: new FormArray([]),
      diopters: new FormArray([]),
      polarization: new FormControl('')
    });
  }

  private loadCategories() {
    this.productsService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  private loadSexes() {
    this.productsService.getSexes().subscribe((sexes: Sex[]) => {
      this.sexes = sexes.map(item => {
        if (this.searchedSexes !== undefined && this.searchedSexes.toString().includes(item.id.toString())) {
          item.checked = true;
        }
        return item;
      });
      this.addSexesCheckboxes();
    });
  }

  private addSexesCheckboxes() {
    this.sexes.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.filterForm.controls.sexes as FormArray).push(control);
    });
  }

  private loadLensColors() {
    this.productsService.getLensColors().subscribe((data: Color[]) => {
      this.lensColors = data.map(item => {
        if (this.searchedLensColors !== undefined && this.searchedLensColors.toString().includes(item.id.toString())) {
          item.checked = true;
        }
        return item;
      });
      this.addLensColorsCheckboxes();
    });
  }

  private addLensColorsCheckboxes() {
    this.lensColors.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.filterForm.controls.lensColors as FormArray).push(control);
    });
  }

  private loadFrameColors() {
    this.productsService.getFrameColors().subscribe((data: Color[]) => {
      this.frameColors = data.map(item => {
        if (this.searchedFrameColors !== undefined && this.searchedFrameColors.toString().includes(item.id.toString())) {
          item.checked = true;
        }
        return item;
      });
      this.addFrameColorsCheckboxes();
    });
  }

  private addFrameColorsCheckboxes() {
    this.frameColors.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.filterForm.controls.frameColors as FormArray).push(control);
    });
  }

  private loadFrameMaterials() {
    this.productsService.getFrameMaterials().subscribe((frameMaterial: Material[]) => {
      this.frameMaterials = frameMaterial.map(item => {
        if (this.searchedFrameMaterials !== undefined && this.searchedFrameMaterials.toString().includes(item.id.toString())) {
          item.checked = true;
        }
        return item;
      });
      this.addFrameMaterialsCheckboxes();
    });
  }

  private addFrameMaterialsCheckboxes() {
    this.frameMaterials.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.filterForm.controls.frameMaterials as FormArray).push(control);
    });
  }

  private loadDiopters() {
    this.productsService.getDiopters().subscribe((diopters: Diopter[]) => {
      this.diopters = diopters.map(item => {
        if (this.searchedDiopters !== undefined && this.searchedDiopters.toString().includes(item.id.toString())) {
          item.checked = true;
        }
        return item;
      });
      this.addDioptersCheckboxes();
    });
  }

  private addDioptersCheckboxes() {
    this.diopters.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.filterForm.controls.diopters as FormArray).push(control);
    });
  }

  doPriceFilter() {
    const minPrice = this.filterForm.controls.minPrice.valid ? this.filterForm.controls.minPrice.value : undefined;
    const maxPrice = this.filterForm.controls.maxPrice.value ? this.filterForm.controls.maxPrice.value : undefined;
    this.doPriceQuery(minPrice, maxPrice);
  }

  private doPriceQuery(minPrice, maxPrice) {
    const priceQueryParams: any = {};
    priceQueryParams.minprice = minPrice ? minPrice : undefined;
    priceQueryParams.maxprice = maxPrice ? maxPrice : undefined;
    this.router.navigate(['.'],
      {
        relativeTo: this.activatedRoute,
        queryParams: priceQueryParams,
        queryParamsHandling: 'merge'
      });
    this.filterService.changeMinPrice(minPrice);
    this.filterService.changeMaxPrice(maxPrice);
  }

  private nullifyPriceFilter() {
    this.getServerMinPrice();
    this.getServerMaxPrice();
  }

  private doSexesFilter(sexId) {
    const sex = this.sexes.find(value => value.id === sexId);
    if (this.sexes) {
      sex.checked = !sex.checked;
    }
    const sexes = this.sexes.filter(item => {
      return item.checked === true;
    }).map(item => item.id);
    this.doSexQuery(sexes);
  }

  private doSexQuery(sexes) {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sex: sexes
      },
      queryParamsHandling: 'merge'
    });
    this.filterService.changeSearchedSexes(sexes);
  }

  private nullifySexFilter(sexes) {
    this.sexes.forEach(sex => sex.checked = false);
    this.doSexQuery(sexes);
  }

  private doLensColorsFilter(lensColorId) {
    const lensColor = this.lensColors.find(value => value.id === lensColorId);
    if (this.lensColors) {
      lensColor.checked = !lensColor.checked;
    }

    const lensColors = this.lensColors.filter(item => {
      return item.checked === true;
    }).map(item => item.id);
    this.doLensColorsQuery(lensColors);
  }

  private doLensColorsQuery(lensColors) {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        lenscolor: lensColors
      },
      queryParamsHandling: 'merge'
    });
    this.filterService.changeSearchedLensColors(lensColors);
  }

  private nullifyLensColorFilter(lensColors) {
    this.lensColors.forEach(lensColor => lensColor.checked = false);
    this.doLensColorsQuery(lensColors);
  }

  private doFrameColorsFilter(frameColorId) {
    const frameColor = this.frameColors.find(value => value.id === frameColorId);
    if (this.frameColors) {
      frameColor.checked = !frameColor.checked;
    }

    const frameColors = this.frameColors.filter(item => {
      return item.checked === true;
    }).map(item => item.id);

    this.doFrameColorsQuery(frameColors);
  }

  private doFrameColorsQuery(frameColors) {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        framecolor: frameColors
      },
      queryParamsHandling: 'merge'
    });
    this.filterService.changeSearchedFrameColors(frameColors);
  }

  private nullifyFrameColorFilter(frameColors) {
    this.frameColors.forEach(frameColor => frameColor.checked = false);
    this.doFrameColorsQuery(frameColors);
  }

  private doFrameMaterialsFilter(frameMaterialId) {
    const frameMaterial = this.frameMaterials.find(value => value.id === frameMaterialId);
    if (this.frameMaterials) {
      frameMaterial.checked = !frameMaterial.checked;
    }

    const frameMaterials = this.frameMaterials.filter(frameMat => {
      return frameMat.checked === true;
    }).map(item => item.id);

    this.doFrameMaterialsQuery(frameMaterials);
  }

  private doFrameMaterialsQuery(frameMaterials) {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        framemat: frameMaterials
      },
      queryParamsHandling: 'merge'
    });
    this.filterService.changeSearchedFrameMaterials(frameMaterials);
  }

  private nullifyFrameMaterialFilter(frameMaterials) {
    this.frameMaterials.forEach(frameMaterial => frameMaterial.checked = false);
    this.doFrameMaterialsQuery(frameMaterials);
  }

  private doDioptersFilter(diopterId) {
    const diopter = this.diopters.find(value => value.id === diopterId);
    if (this.diopters) {
      diopter.checked = !diopter.checked;
    }

    const diopters = this.diopters.filter(item => {
      return item.checked === true;
    }).map(item => item.id);

    this.doDioptersQuery(diopters);
  }

  private doDioptersQuery(diopters) {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        diopter: diopters
      },
      queryParamsHandling: 'merge'
    });
    this.filterService.changeSearchedDiopters(diopters);
  }

  private nullifyDiopterFilter(diopters) {
    this.diopters.forEach(diopter => diopter.checked = false);
    this.doDioptersQuery(diopters);
  }

  doPolarizationFilter() {
    this.polarization = !this.polarization;
    this.doPolarizationQuery();
  }

  private doPolarizationQuery() {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        polarization: this.polarization ? this.polarization : null
      },
      queryParamsHandling: 'merge'
    });
    this.filterService.changeSearchedPolarization(this.polarization);
  }

  private nullifyPolarizationFilter() {
    this.polarization = false;
    this.doPolarizationQuery();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  get filterFormSexes() {
    return this.filterForm.get('sexes') as FormArray;
  }

  get filterFormLensColors() {
    return this.filterForm.get('lensColors') as FormArray;
  }

  get filterFormFrameColors() {
    return this.filterForm.get('frameColors') as FormArray;
  }

  get filterFormFrameMaterials() {
    return this.filterForm.get('frameMaterials') as FormArray;
  }

  get filterFormDiopters() {
    return this.filterForm.get('diopters') as FormArray;
  }
}
